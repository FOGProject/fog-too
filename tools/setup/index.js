var async = require('async');

var figlet = require('figlet');
var chalk = require('chalk');
var CLI = require('clui');
var Spinner = CLI.Spinner;

var config = require('../lib/config');
var inquire = require('./lib/inquire');
var schema = require('./lib/schema');
var secure = require('./lib/secure');

var welcome = 'Welcome to the FOG 2.0 installer.\nYou will be guided through configuring your new server for production.'
var COMPLETED = false;
var payload = {};

var printHeader = function(text) {
    console.log();
    console.log(chalk.yellow(text));
}

console.log(
  chalk.cyan(
    figlet.textSync('FOG 2.0', { horizontalLayout: 'full' })
  )
);
console.log();
console.log(welcome);

async.waterfall([
    function(next) {
        printHeader("Database configuration")
        inquire.getDatabaseInfo(function(answers) {
            if(!answers.username.length)
                delete answers.username;

            payload.connections = payload.connections || {};
            payload.connections.main = answers;
            next();
        });
    },
    function(next) {
        printHeader("Administrator account configuration");
        inquire.getAdminInfo(function(answers) {
            payload.admin = answers;
            next();
        });       
    },
    function(next) {
        printHeader("Webserver configuration");
        inquire.getWebserverInfo(function(answers) {
            payload.port = answers.port;
            payload.host = answers.host;
            delete answers.port;
            delete answers.host;
            payload.webserver = answers;
            next();
        });       
    },
    function(next) {
        printHeader("Securing installation");
        var status = new Spinner('Generating session secret');
        status.start();  
        payload.session = {};
        payload.session.secret = secure.generateSecret();
        status.stop();
        console.log("Session secret generated");

        var status = new Spinner('Generating JWT secret');
        status.start();  
        payload.auth = {};
        payload.auth.jwt = {};
        payload.auth.jwt.secret = secure.generateSecret();
        status.stop();
        console.log("JWT secret generated");

        var status = new Spinner('Generating key pair');
        status.start();
        secure.generateKeypair(function(err, keypair) {
            status.stop();
            if (err) return next("Failed to generate keypair: " + err);
            console.log("Keypair generated");
            next();
        });
    },
    function(next) {
        printHeader("Applying configuration");
        var status = new Spinner('Saving configuration');
        status.start();  
        var toWrite = JSON.parse(JSON.stringify(payload)); // quick deep clone
        delete toWrite.admin;
        config.overlayPrefs(toWrite);
        config.savePrefs(function(err) {
            status.stop();
            if(err) return next("Failed to save configuration: " + err);
            next();
        });
    },
    function(next) {
        var status = new Spinner('Applying database schema');
        status.start();  
        schema.generate(payload.admin.password, payload.admin.email, function(err) {
            status.stop();
            if(err) return next("Failed to apply database schema: " + err);
            console.log("Database schema applied");
            next();
        });
    },   
], function (err, result) {
    if(err) console.log(chalk.bgRed(err));
    COMPLETED = true;
    process.exit();
});

(function wait () {
   if (!COMPLETED) setTimeout(wait, 1000);
})();