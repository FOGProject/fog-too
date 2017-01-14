'use strict;'

var MongoClient = require('mongodb').MongoClient
var util = require('util');

var DATABASE_URL = "mongodb://%s:%s@%s:%d/%s";
var DATABASE_URL_NO_AUTH = "mongodb://%s:%d/%s";

module.exports = {
    connect: function(host, port, database, username, password, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        if (!username || !username.length) {
            url = util.format(DATABASE_URL_NO_AUTH, host, port, database);
        } else {
            url = util.format(DATABASE_URL, username, password, host, port, database);
        }
        MongoClient.connect(url, function (err, db) {
            if (err) return next(err);
            next(null, db);
        });
    },
    verifyConnection: function(host, port, database, username, password, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        module.exports.connect(host, port, database, username, password, function(err, db) {
            if (err) return next(err);
            db.close();
            next();
        });
    }
};