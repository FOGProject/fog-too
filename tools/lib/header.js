'use strict;'

var figlet = require('figlet');
var chalk = require('chalk');

var config = require('./config');

module.exports = {
    print: function(message) {
        console.log(chalk.cyan(
            figlet.textSync('FOG ' + config.sailsConfig.version, { horizontalLayout: 'full' })
        ));
        console.log();
        console.log(message);
    },
    printSection: function(title) {
        console.log();
        console.log(chalk.yellow(title));       
    }
};