/**
 * RoleController
 *
 * @description :: Server-side logic for managing Hosts
 */

module.exports = {
	list: function(req, res) {
        RoleService.getAll(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        RoleService.get(id, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        RoleService.search(query, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        RoleService.create(params, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        RoleService.update(id, params, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },    
    destroy: function(req, res) {
        var id = req.param('id');
        RoleService.destroy(id, function(err) {
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

