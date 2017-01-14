var inquirer = require('inquirer');

module.exports = {
    getBackupInfo: function(next){
        var questions = [                
            {
                name: 'backup',
                type: 'confirm',
                message: 'Have you made a backup of your FOG database (recommended)?',
                default: false,
            },
            {
                name: 'confirmBackup',
                type: 'confirm',
                message: 'Are you sure you wish to proceed migrating without a backup?',
                default: false,
                when: function (answers) {
                    return !answers['backup'];
                }
            }
        ];
        inquirer.prompt(questions).then(next);
    },
    getSchemaVersion: function(latestRevision, currentRev, next) {
        var questions = [                
            {
                name: 'revision',
                type: 'input',
                message: 'Enter the schema revision to migrate to:',
                default: latestRevision,
                validate: function( value ) {
                    if (isNaN(value)) {
                        return 'You must enter a number';
                    } else if(parseInt(value, 10) > latestRevision) {
                         return 'You cannot upgrade past the current schema revision of ' + latestRevision;
                    } else if(parseInt(value, 10) < 0) {
                         return 'You cannot downgrade past schema revision 1';
                     } else if(parseInt(value, 10) == currentRev) {
                         return 'FOG is already on schema revision ' + currentRev;                        
                    } else {
                        return true;
                    }
                }
            }
        ];
        inquirer.prompt(questions).then(next);
    },
};