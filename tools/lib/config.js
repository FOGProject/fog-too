'use strict;'

var _ = require('lodash');
var path = require('path');
var fs = require('fs');

var appRoot = path.join(__dirname, '..', '..');
var cfgPath = path.join(appRoot, 'config.json');
var sailsCFGPath = path.join(appRoot, 'sails.json');

var safeReadJSONSync = function(filepath) {
    if(!fs.existsSync(filepath))
        return {};
    var raw;
    try {
        raw = fs.readFileSync (filepath, 'utf8');
    } catch (err) {
        return {};
    }
    var cfg = JSON.parse(raw) || {};
    return cfg;
};

module.exports = {
    appRoot: appRoot,
    path: cfgPath,
    preferences: safeReadJSONSync(cfgPath),
    sailsConfig: safeReadJSONSync(sailsCFGPath),
    getMergedSettings: function() {
        var merged = _.merge(module.exports.preferences, module.exports.sailsConfig);
        return merged;
    },
    overlayPrefs: function(payload) {
        module.exports.preferences = _.merge(module.exports.preferences, payload);
    },
    savePrefs: function(next) {
        next = (typeof next !== 'function') ? function() {} : next;
        fs.writeFile (cfgPath, JSON.stringify(module.exports.preferences, null, 2), function(err) {
            next(err);
        });
    }
};