/**
 * HostController
 *
 * @description :: Server-side logic for managing Hosts
 */

module.exports = {
	list: function(req, res) {
        Host.find().exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        Host.find({id: id}).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        Host.find(query, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        Host.create(params).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        Host.update({id: id}, params).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    destroy: function(req, res) {
        var id = req.param('id');
        Host.destroy({id: id}).exec(function(err) {
            if (err) return res.serverError(err);
            res.json();
        });
    }
};

