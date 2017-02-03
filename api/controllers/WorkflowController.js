/**
 * WorkflowController
 *
 * @description :: Server-side logic for managing Workflows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
        Workflow.find().exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        Workflow.find({id: id}).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        Workflow.find(query, function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        Workflow.create(params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.location('/api/workflow/'+result.id);
            res.created(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        Workflow.update({id: id}, params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },    
    destroy: function(req, res) {
        var id = req.param('id');
        Workflow.destroy({id: id}).exec(function(err) {
            if (err) return res.negotiate(err);
            res.json();
        });
    }
};

