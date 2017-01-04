var path = require('path');
var fs = require('fs');
var rmdir = require('rimraf');
var copy = require('recursive-copy');
var pluginDir = path.join(__dirname, '../../plugins');
var apiDir = path.join(__dirname, '../');
var pluginConfigFile = 'package.json';
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
    var configFile = path.join(pluginDir, pluginName, pluginConfigFile);
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
        var hookKeys = Object.keys(config.hooks);
        async.forEach(hookKeys, function(key, cb) {
          var fnName = config.hooks[key].trim();
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
          BusService.subscribe(key, fnc);
          cb();
        }, function (err) {
          next(err);
        });
      });
    });
  },
  registerAPI: function(pluginName, next) {
    sails.log.info("Registering [" + pluginName + "] API");
    async.parallel([
      function(callback) {
        copy(path.join(pluginDir, pluginName, "controllers"), path.join(apiDir, "controllers", pluginName), function (err, results) {
          callback();
        });
      },
      function(callback) {
        copy(path.join(pluginDir, pluginName, "models"), path.join(apiDir, "models", pluginName), function (err, results) {
          callback();
        });
      },
      function(callback) {
        copy(path.join(pluginDir, pluginName, "policies"), path.join(apiDir, "policies", pluginName), function (err, results) {
          callback();
        });
      },
      function(callback) {
        copy(path.join(pluginDir, pluginName, "responses"), path.join(apiDir, "responses", pluginName), function (err, results) {
          callback();
        });
      },
      function(callback) {
        copy(path.join(pluginDir, pluginName, "services"), path.join(apiDir, "services", pluginName), function (err, results) {
          callback();
        });
      },          
    ], function(err, results) {
      next(err);
    });
  },
  removeAPI: function(pluginName, next) {
    sails.log.info("Removing [" + pluginName + "] API");
    async.parallel([
      function(callback) {
        rmdir(path.join(apiDir, "controllers", pluginName), function (err) {
          callback();
        });
      },
      function(callback) {
        rmdir(path.join(apiDir, "models", pluginName), function (err) {
          callback();
        });
      },
      function(callback) {
        rmdir(path.join(apiDir, "policies", pluginName), function (err) {
          callback();
        });
      },     
      function(callback) {
        rmdir(path.join(apiDir, "responses", pluginName), function (err) {
          callback();
        });
      },
      function(callback) {
        rmdir(path.join(apiDir, "services", pluginName), function (err) {
          callback();
        });
      },            
    ], function(err, results) {
      next(err);
    });
  },
  scanPlugins: function(next) {
    sails.log.info('Scanning plugin directory');
    fs.readdir(pluginDir, function(err, files) {
      async.forEach(files, function(file, cb) {
        fs.stat(path.join(pluginDir, file), function(err, stats) {
          if (err) {
            cb();
            return;
          }

          if (stats.isDirectory()) {
            sails.log.info('Found Plugin [' + file + ']');
            plugins.push(file);
          }
          cb();
        });
      }, function(err) {
          next(err);
      });
    });
  },
  cleanup: function(next) {
    sails.log.info('Cleaning up leftover plugins');
    next();
  },
  repair: function(next) {
    sails.log.info('Repairing broken plugins');
    next();
  },
  initialize: function(next) {
    sails.log.info('Initializing Plugin System');
    sails.log.info('Plugin Directory: "' + pluginDir + '"');
    async.waterfall([
      PluginService.scanPlugins,
      PluginService.cleanup,
      PluginService.repair,
      function(callback) {
        async.forEach(plugins, function(plugin, cb) {
          PluginService.registerHooks(plugin, function(err) {
            cb();
          });
        }, function(err) {
          callback(err);
        });       
      }
    ], next);
  }
};