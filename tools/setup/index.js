var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var _ = require('lodash');
var CLI = require('clui');
var Spinner = CLI.Spinner;
var Progress = CLI.Progress;
var fs = require('fs');
var path = require('path');
var async = require('async');
var forge = require('node-forge');
var rsa = forge.pki.rsa;

var inquire = require('./lib/inquire');
var genSecret = require('./lib/generateSecret');

var configFilePath = path.join(process.cwd(), 'config.json');

var configFile = require(configFilePath) || {};

var welcome = 'Welcome to the FOG 2.0 installer.\nYou will be guided through configuring your new server for production.'
var COMPLETED = false;

var config = {};


clear();
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
        printHeader("Database configuration")
        inquire.getDatabaseInfo(function(answers) {
            if(!answers.username.length)
                delete answers.username;

            config.connections = config.connections || {};
            config.connections.main = answers;
            next();
        });
    },
    function(next) {
        printHeader("Administrator account configuration");
        inquire.getAdminInfo(function(answers) {
            config.admin = answers;
            next();
        });       
    },
    function(next) {
        printHeader("Webserver configuration");
        inquire.getWebserverInfo(function(answers) {
            config.port = answers.port;
            config.host = answers.host;
            delete answers.port;
            delete answers.host;
            config.webserver = answers;
            next();
        });       
    },
    function(next) {
        printHeader("Securing installation");
        var status = new Spinner('Generating session secret');
        status.start();  
        config.session = {};
        config.session.secret = genSecret();
        status.stop();
        console.log("Session secret generated");

        var status = new Spinner('Generating JWT secret');
        status.start();  
        config.auth = {};
        config.auth.jwt = {};
        config.auth.jwt.secret = genSecret();
        status.stop();
        console.log("JWT secret generated");

        var status = new Spinner('Generating key pair');
        status.start();  
        rsa.generateKeyPair({bits: 4096, workers: -1}, function(err, keypair) {
            // keypair.privateKey, keypair.publicKey
            status.stop();
            console.log("Key pair generated");
            next();
        });
    },
    function(next) {
        printHeader("Applying configuration");
        var status = new Spinner('Saving configuration');
        status.start();  
        var toWrite = _.merge(configFile, config);
        delete toWrite.admin;

        fs.writeFile (configFilePath, JSON.stringify(toWrite, null, 2), function(err) {
            status.stop();
            if(err) {
                console.log(chalk.bgRed("--> Failed to save configuration: " + err));
                return next(err);
            }
            console.log("Configuration saved");
            next();
        });
    },
], function (err, result) {
    COMPLETED = true;
});



(function wait () {
   if (!COMPLETED) setTimeout(wait, 1000);
})();