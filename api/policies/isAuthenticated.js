/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user
 *                 Looks for an Authorization header bearing a valid JWT token
 *                 OR a valid session. Also sets req.user to the user object
 *                 for any chained policies
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken');
var jwtConfig = sails.config.auth.jwt;

module.exports = function(req, res, next) {
  // Check session
  if (req.session.me) {
    User.findOne({id: req.session.me}).populateAll().exec(function(err, user) {
      if (err || !user ) {
        req.session.me = null;
        return res.send(401);
      }
      req.user = user.toJSON();
      return next();
    });
  } else if (req.header('authorization')) {
    // If one exists, attempt to get the header data
    var token = req.header('authorization').split('Bearer ')[1];
    // If there's nothing after "Bearer", send a 401
    if (!token) return res.send(401);
    // If there is something, attempt to parse it as a JWT token
    jwt.verify(token, jwtConfig.secret, function(err, payload) {
      // If there's an error verifying the token (e.g. it's invalid or expired),
      // send a 401.
      if (err) {
        return res.send(401);
      }
      // If there's no user ID in the token, send a 401
      if (!payload.user) return res.send(401);
      // Otherwise try to look up that user
      User.findOne({id: payload.user}).populateAll().exec(function(err, user) {
        if (err) return res.negotiate(err);
        // If the user can't be found, send a 401
        if (!user) return res.send(401);
        // Otherwise save the user object on the request (i.e. "log in") and continue
        req.user = user.toJSON();
        return next();
      });
    });
  } else {
      // Send a 401 response letting the user agent know they need to login to
      // access this endpoint.
      return res.send(401);      
  }
};