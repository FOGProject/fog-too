/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * @override
   */
  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  update: function (req, res, next) {
    sails.services.passport.protocols.local.update(req.body, function (err, user) {
      if (err) return res.negotiate(err);
      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  },
  list: function(req, res) {
    UserService.getAll(function(err, result) {
      if (err) return res.serverError(err);
      result.passports = null;
      delete result.passports;
      res.json(result);
    });
  },
  find: function(req, res) {
    var id = req.param('id');
    UserService.get(id, function(err, result) {
      if (err) return res.serverError(err);
      result.passports = null;
      delete result.passports;
      res.json(result);
    });
  },
  search: function(req, res) {
    var query = req.query;
    query.passports = null;
    delete query.passports;
    UserService.search(query, function(err, result) {
      if (err) return res.serverError(err);
      result.passports = null;
      delete result.passports;
      res.json(result);
    });
  }
};
