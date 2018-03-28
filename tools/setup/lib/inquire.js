var inquirer = require('inquirer');
var CLI = require('clui');
var Spinner = CLI.Spinner;
var chalk = require('chalk');
var database = require('../../lib/database');

var verifyDB = function(answers, next)
{
    var status = new Spinner('Verifying database information, please wait...');
    status.start();  
    database.connect(answers.host, answers.port, answers.database, answers.username, answers.password, function(err, db) {
        status.stop();
        if(err) {
            var prefix = "MongoError: ";
            if(err.toString().startsWith(prefix))
                err = err.toString().replace(prefix, "");
            console.log(chalk.bgRed("--> Incorrect database information: " + err));
            console.log();
            return next(err);
        }

        console.log(chalk.green("Database information verified"));
        next();
    });
};

module.exports = {
    getDatabaseInfo: function(next) {
        var questions = [         
            {
                name: 'host',
                type: 'input',
                message: 'Enter the database server address:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the database server address';
                    }
                }
            },
            {
                name: 'port',
                type: 'input',
                message: 'Enter the database server port:',
                default: 27017,
                validate: function( value ) {
                    if (!isNaN(value)) {
                        return true;
                    } else {
                        return 'You must enter a number';
                    }
                }
            },             
            {
                name: 'database',
                type: 'input',
                message: 'Enter the database name:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the database';
                    }
                }
            },                                  
            {
                name: 'username',
                type: 'input',
                message: 'Enter the database username:'
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter the database password:',
                when: function (answers) {
                    return answers['username'].length;
                }
            }
        ];
        inquirer.prompt(questions).then(function(answers) {      
            verifyDB(answers, function(err) {
                if(err)
                    return module.exports.getDatabaseInfo(next);
                answers.adapter = 'sails-mongo';
                next(answers);
            })
        });
    },
    getAdminInfo: function(next){
        var questions = [
            {
                name: 'email',
                type: 'input',
                message: 'Enter an email address for the Administrator account:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter an email address';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter a password for the Administrator account:',
                validate: function( value ) {
                    if (value.length >= 8) {
                        return true;
                    } else {
                        return 'Please enter a password at least 8 characters long';
                    }
                }
            }
        ];
        inquirer.prompt(questions).then(next);
    },
    getWebserverInfo: function(next){
        var questions = [
             {
                name: 'host',
                type: 'input',
                message: 'What address should FOG bind to:',
                default: '0.0.0.0'
            },   
            {
                name: 'port',
                type: 'input',
                message: 'Enter the port number FOG should listen on:',
                default: 1337,
                validate: function( value ) {
                    if (!isNaN(value)) {
                        return true;
                    } else {
                        return 'You must enter a number';
                    }
                }
            },                     
            {
                name: 'proxy',
                type: 'confirm',
                message: 'Will FOG operate behind a reverse proxy (recommended)?',
                default: true,
            },
            {
                name: 'horizontal',
                type: 'confirm',
                message: 'Will there be pool of FOG servers (horizontal scaling)?',
                when: function (answers) {
                    return answers['proxy'];
                }
            },                        
            {
                name: 'vertical',
                type: 'confirm',
                message: 'Should FOG multithread itself (vertical scaling)?',
                default: true,
            },
        ];
        inquirer.prompt(questions).then(next);
    }
};