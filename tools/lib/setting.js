'use strict;'

module.exports = {
    create: function(db, name, value, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        db.collection('setting').insert({name:name, value:value}, function(err, setting) {
            if (err) return next(err);
            next();
        });
    },    
    get: function(db, name, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        db.collection('setting').findOne({name:name}, function(err, setting) {
            if (err) return next(err);
            next(null, setting.value);
        });
    },
    set: function(db, name, value, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        db.collection('setting').findOneAndUpdate({name:name}, {$set: {value: value}}, function(err, setting) {
            if (err) return next(err);
            next(null, setting.value);
        });           
    },
    delete: function(db, name, next) {
        next = (typeof next !== 'function') ? function() {} : next;
        db.collection('setting').findOneAndDelete({name:name}, function(err) {
            if (err) return next(err);
            next();
        });
    },    
};