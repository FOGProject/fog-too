var path = require('path');
var migrationsFolder = path.join(process.cwd(), 'migrations');
var fs = require('fs');
var async = require('async');
var chalk = require('chalk');

var config = require('../../lib/config');
var database = require('../../lib/database');
var setting = require('../../lib/setting');

module.exports = {
    getRevisions: function(next) {
        return next(null, ["1", "2"]);
        fs.readdir(migrationsFolder, function (err, files) {
            if(err) return next(err);

            files = files.filter(function (file) {
                return fs.statSync(path.join(migrationsFolder, file)).isFile();
            })
            next(null, files);
        });
    },
    getMigrations: function(start, end) {
        var revisions = [];
        if (start == end)
            return revisions;
        if (start < end) {
            if (start == end+1)
                return revisions;
            var j = 0;
            for(var i = start+1; i <= end; i++) {
                try {
                    revisions[j] = require(path.join(migrationsFolder, i + ".js"))
                    j++;
                } catch(e) {
                    return null;
                }
            }
        } else {
            var j = 0;
            for(var i = start; i > end; i--) {
                try {
                    revisions[j] = require(path.join(migrationsFolder, i + ".js"))
                    j++;
                } catch(e) {
                    return null;
                }
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
        
        database.connect(conn.host, conn.port, conn.database, conn.user, conn.password, function(err, db) {
            if (err) return next (err);
            module.exports.getCurrentRevision(db, function(err, current) {
                if(err) return next(err);
                var upgrade = target > current;
                var revisions = module.exports.getMigrations(current, target);                
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