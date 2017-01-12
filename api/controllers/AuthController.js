/**
 * AuthController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');
var jwtConfig = sails.config.auth.jwt;

module.exports = {
    issueToken: function(req, res) {
        var username = req.param('username');
        var password = req.param('password');
        UserService.authenticate(username, password, function(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.badRequest('Invalid credentials.');
            var token = jwt.sign({user: user.id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
            return res.json(token);
        });        
    },
    login: function(req, res) {
        var username = req.param('username');
        var password = req.param('password');
        UserService.authenticate(username, password, function(err, user) {
            if (err) return res.negotiate(err);
            if (!user) return res.badRequest('Invalid credentials.');
            req.session.me = user.id;
            res.ok('Login Successful');
        });          
    },  
    logout: function(req, res) {
        req.session.me = null;
        res.ok('Logout Successful');
    } 
};

