var _ = require('lodash');
var crypto = require('crypto');
var forge = require('node-forge');
var rsa = forge.pki.rsa;

module.exports = {
  generateSecret: function() {
    // Combine random and case-specific factors into a base string
    var factors = {
      creationDate: (new Date()).getTime(),
      random: Math.random() * (Math.random() * 1000),
      nodeVersion: process.version
    };
    var basestring = '';
    _.each(factors, function(val) {
      basestring += val;
    });

    // Build hash
    var hash =
    crypto.createHash('md5')
    .update(basestring)
    .digest('hex');

    return hash;
  },
  generateKeypair: function(next) {
    rsa.generateKeyPair({bits: 4096, workers: -1}, next);
  }
};

