/**
 * UserController
 *
 * @description :: Server-side logic for managing Hosts
 */

module.exports = {
	list: function(req, res) {
        User.find().exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    listMe: function(req, res) {
        res.json(req.user);
    },
    find: function(req, res) {
        var id = req.param('id');
        User.find({id: id}).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        User.find(query, function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        User.create(params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.location('/api/user/'+result.id);
            res.created(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        User.update({id: id}, params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },    
    destroy: function(req, res) {
        var id = req.param('id');
        User.destroy({id: id}).exec(function(err) {
            if (err) return res.negotiate(err);
            res.json();
        });
    }
};

