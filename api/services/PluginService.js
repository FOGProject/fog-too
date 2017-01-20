'use strict;'

var path = require('path');
var fs = require('fs');
var rmdir = require('rimraf');
var copy = require('recursive-copy');
var pluginDir = path.join(__dirname, '../../node_modules');
var pluginConfig = path.join(__dirname, '../../plugins.json');
var pluginPrefix = "fog-plugin-";
var pluginPackageFile = 'package.json';
var plugins = [];

var resolveFunction = function(name) {
  var scope = name.split(".");
  var fnc = global;
  for (var i = 0; i < scope.length; i++) {
    fnc = fnc[scope[i]];
    if (typeof fnc === undefined)
      return undefined;
  }
  return fnc;
};

module.exports = {
  getList: function() {
    return plugins;
  },
  registerHooks: function(pluginName, next) {
    sails.log.info("Registering [" + pluginName + "] hooks");
    var configFile = path.join(pluginDir, pluginPrefix + pluginName, pluginPackageFile);
    fs.exists(configFile, function(exists) {
      if (!exists) {
        next("Plugin config file does not exist");
        return;
      }
      
      // Do not use require as it will execute any code
      // Allowing for a potential attack vetor
      fs.readFile(configFile, 'utf8', function(err, data) {
        if (err) {
          next(err);
          return;
        }

        var config = JSON.parse(data);
        var hookKeys = Object.keys(config.fog.hooks);
        async.forEach(hookKeys, function(key, cb) {
          var fnName = config.fog.hooks[key].trim();
          if (!fnName) {
            sails.log.error("No function name provided when register [" + key + "] for [" + pluginName + "]");
            cb();
            return;
          }

          var fnc = resolveFunction(fnName);
          if (typeof fnc !== "function") {
            sails.log.error("Failed to register [" + key + "] for [" + pluginName + "], [" + fnName + "] is not a function");
            cb();
            return;   
          }
          sails.log.info("Registering [" + fnName + "] on event [" + key + "] for [" + pluginName + "]");
          // BusService.subscribe(key, fnc);
          cb();
        }, function (err) {
          next(err);
        });
      });
    });
  },
  scanPlugins: function(next) {
    sails.log.info('Scanning plugins');
    fs.exists(pluginConfig, function(exists) {
      if (!exists) {
        next("Plugin config file does not exist, creating");
        var configData = {
          enabled: [],
          disabled: []
        };
        var json = JSON.stringify(configData);
        fs.writeFile(pluginConfig, json, 'utf8', next);
        return;
      }
      
      // Do not use require as it will execute any code
      // Allowing for a potential attack vetor
      fs.readFile(pluginConfig, 'utf8', function(err, data) {
        if (err) {
          next(err);
          return;
        }

        var config = JSON.parse(data);
        plugins = config.enabled;
        for (var i = 0, len = plugins.length; i < len; i++) {
          sails.log.info("Found plugin [" + plugins[i] + "]");
        }
        next();
      });
    });
  },
  initialize: function(next) {
    sails.log.info('Initializing Plugin System');
    async.waterfall([
      PluginService.scanPlugins,   
      function(callback) {
        async.forEach(plugins, function(plugin, cb) {
          PluginService.registerHooks(plugin, function(err) {
            cb();
          });
        }, function(err) {
          callback(err);
        });       
      },
    ], next);
  }
};