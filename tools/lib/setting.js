'use strict;'

var config = require('./config');
var SailsApp = require('sails').Sails;

module.exports = {
    create: function(name, value, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        var sails = new SailsApp();
        sails.load(config.getMergedSettings(), function(err, sails) {
            if (err) return next(err);
            sails.services.settingservice.create(name, value, function (err, value) {
                sails.lower(function() {
                    if (err) return next(err);
                    next(null, value);
                });
            });
        });           
    },    
    get: function(name, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        var sails = new SailsApp();
        sails.load(config.getMergedSettings(), function(err, sails) {
            if (err) return next(err);
            sails.services.settingservice.get(name, function(err, value) {
                sails.lower(function() {
                    if (err) return next(err);
                    next(null, value.value);
                });
            });
        });           
    },
    set: function(name, value, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        var sails = new SailsApp();
        sails.load(config.getMergedSettings(), function(err, sails) {
            if (err) return next(err);
            sails.services.settingservice.update(name, value, function(err, value) {
                sails.lower(function() {
                    if (err) return next(err);
                    next(null, value.value);
                });
            });
        });           
    },
    delete: function(name, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        var sails = new SailsApp();
        sails.load(config.getMergedSettings(), function(err, sails) {
            if (err) return next(err);
            sails.services.settingservice.destroy(name, function(err, value) {
                sails.lower(function() {
                    if (err) return next(err);
                    next(null, value.value);
                });
            });         
        });
    },    
};