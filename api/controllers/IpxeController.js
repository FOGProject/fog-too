/**
 * iPXE Controller
 *
 * @description :: Server-side logic for managing ipxe items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function(req, res) {
        Ipxe.find().exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        Ipxe.find({id: id}).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        Ipxe.find(query, function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    create: function(req, res) {
        var params = req.params.all();
        Ipxe.create(params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.location('/api/ipxe/'+result.id);
            res.created(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        Ipxe.update({id: id}, params).exec(function(err, result) {
            if (err) return res.negotiate(err);
            res.json(result);
        });
    },
    destroy: function(req, res) {
        var id = req.param('id');
        Ipxe.destroy({id: id}).exec(function(err) {
            if (err) return res.negotiate(err);
            res.json();
        });
    }
};

