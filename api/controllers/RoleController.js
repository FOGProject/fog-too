/**
 * RoleController
 *
 * @description :: Server-side logic for managing Hosts
 */

module.exports = {
	list: function(req, res) {
        Role.find().exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        Role.find({id: id}).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        Role.find(query, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        Role.create(params).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        Role.update({id: id}, params).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },    
    destroy: function(req, res) {
        var id = req.param('id');
        Role.destroy({id: id}).exec(function(err) {
            if (err) return res.serverError(err);
            res.json();
        });
    },
    assign: function(req, res) {
        var id = req.param('id');
        var hostIds = req.param('userIds');
        RoleService.assign(id, userIds, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        }); 
    },
};

