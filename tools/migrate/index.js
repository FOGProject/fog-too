var chalk = require('chalk');
var figlet = require('figlet');
var _ = require('lodash');
var CLI = require('clui');
var Spinner = CLI.Spinner;
var Gauge  = CLI.Gauge ;
var Line = CLI.Line;
var fs = require('fs');
var path = require('path');
var async = require('async');
var sailsAPI = require('sails');
var MAX_RECORDS_IN_MEM = 500;

var welcome = 'Welcome to the FOG 2.0 schema migrator.\nYou will be guided through migrating your current database schema.'
var COMPLETED = false;

var config = require('../lib/config');
var inquire = require('./lib/inquire');
var migrations = require('./lib/migrations');
var revision;

console.log(
  chalk.cyan(
    figlet.textSync('FOG 2.0', { horizontalLayout: 'full' })
  )
);

console.log();
console.log(welcome);

var printHeader = function(text) {
    console.log();
    console.log(chalk.yellow(text));
}

async.waterfall([
    function(next) {
        printHeader("Database backup");
        inquire.getBackupInfo(function(answers) {
            if(!answers.backup && !answers.confirmBackup)
                return next('No backup');

            next();
        });
    },
    function(next) {
      printHeader("Migration");
      var status = new Spinner('Calculating deltas...');
      var pendingText = "Deltas calculated";
      status.start();
      var didMigrate = false;
      migrations.auto(config.preferences.connections.main, function(upgrade, fromRev, toRev, description) {
        didMigrate = true;
        status.stop();
        console.log(pendingText);
        //pendingText = (upgrade) ? ("Revision " + fromRev + " -> " + toRev + "                  APPLYING: " + description)
        //                        : ("Revision " + fromRev + " -> " + toRev + "                  REVERSING: " + description);
        pendingText = "Revision " + fromRev + " -> " + toRev + "\t ";
        pendingText += chalk.cyan(((upgrade) ? "APPLYING: " : "REVERSING: ") + description);
        status = new Spinner(pendingText);
        status.start();
      }, function(err) {
        status.stop();
        console.log(pendingText);
        if(didMigrate) {
          console.log("Migration complete");
        } else {
          console.log("No migration needed");
        }
        next();
      });
    }
], function (err, result) {
    if(err) console.log(chalk.bgRed(err));
    COMPLETED = true;
    process.exit();
});



(function wait () {
   if (!COMPLETED) setTimeout(wait, 1000);
})();