var async = require('async');
var fs = require('fs');
var path = require('path');
var migrationsFolder = path.join(process.cwd(), 'migrations');

var config = require('../../lib/config');
var database = require('../../lib/database');
var setting = require('../../lib/setting');

module.exports = {
    getMigrations: function(start, end) {
        if (start == end)
            return [];
        if (start < end && start == end+1)
            return [];

        var revisions = [];
        var toLoad = [];

        if (start < end) {
            for (var i = start+1; i <= end; i++) {
                toLoad.push(i);
            }
        } else {
            for (var i = start; i > end; i--) {
                toLoad.push(i);
            }            
        }

        for(var i = 0; i < toLoad.length; i++) {
            try {
                revisions[i] = require(path.join(migrationsFolder, toLoad[i] + ".js"))
            } catch(e) {
                throw 'Missing migration file for schema ' + toLoad[i];
            }
        }
        return revisions;
    },
    getCurrentRevision: function(db, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        setting.get(db, "schema", function(err, value) {
            if (err) return next(err);
            if (!value) return next('Schema revision not set in database');
            if (value.revision === undefined) return next('Schema revision not set in database');
            if(isNaN(value.revision)) return next('Schema revision not is not a number');

            var revisionNumber = parseInt(value.revision, 10);
            next(null, revisionNumber);
        });           
    },
    auto: function(conn, step, next) {
        module.exports.manual(conn, config.sailsConfig.schema, step, next);
    },
    manual: function(conn, target, step, next) {
        step = (typeof step !== 'function') ? function() {} : step;
        next = (typeof next !== 'function') ? function() {} : next;

        if (target < 0) return next("Cannot migrate to a schema lower than 0");
        if (target > config.sailsConfig.schema) return next("Cannot migrate to a schema greater than " + config.sailsConfig.schema);

        database.connect(conn.host, conn.port, conn.database, conn.user, conn.password, function(err, db) {
            if (err) return next (err);
            module.exports.getCurrentRevision(db, function(err, current) {
                if(err) return next(err);
                var upgrade = target > current;
                var revisions;
                try {
                    revisions = module.exports.getMigrations(current, target)
                } catch (e) {
                    return next(e);
                }
                for (var i = 0; i < revisions.length; i++) {
                    if(!revisions[i]) return next('Missing migration file for schema ' + i+1);
                    if(!revisions[i]._meta || !revisions[i]._meta.schema || !revisions[i]._meta.description) 
                        return next('Missing meta data in migration file for schema ' + i+1);
                    
                    if(!revisions[i].up || typeof revisions[i].up !== 'function') return next('Malformed migration file for schema ' + i+1);
                    if(!revisions[i].down || typeof revisions[i].down !== 'function') return next('Malformed migration file for schema ' + i+1);
                }

                async.eachSeries(revisions, function(rev, next) {
                    var toRev = rev._meta.schema;
                    if (!upgrade)
                        toRev--;
                    step(upgrade, current,  toRev, rev._meta.description);
                    var action = (upgrade) ? rev.up : rev.down;
                    action(db, console, function(err) {
                        if (err) return next(err);
                        current = toRev;
                        setting.set(db, "schema", {revision: toRev}, next);
                    });
                }, function(err) {
                    db.close();
                    if(err) return next(err);
                    next();
                });
            });
        });
    }
};