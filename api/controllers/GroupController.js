/**
 * GroupController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
        Group.find().exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        Group.find({id: id}).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        Group.find(query, function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        Group.create(params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.location('/api/group/'+result.id);
            res.created(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        Group.update({id: id}, params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    destroy: function(req, res) {
        var id = req.param('id');
        Group.destroy({id: id}).exec(function(err) {
            if (err) return res.negotiate(err);
            res.json();
        });
    },
    registerHost: function(req, res) {
        var id = req.param('id');
        var hostIds = req.param('hostIds');
        AssociationService.assignMany(Group, Host, "hosts", id, hostIds, function(err) {
            if (err) return res.negotiate(err);
            res.json();
        });    
    },
    unregisterHost: function(req, res) {
        var id = req.param('id');
        var hostIds = req.param('hostIds');
        AssociationService.unassignMany(Group, Host, "hosts", id, hostIds, function(err) {
            if (err) return res.negotiate(err);
            res.json();
        });       
    },
};

