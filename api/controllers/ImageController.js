/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
        Image.find().exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        Image.find({id: id}).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        Image.find(query, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        Image.create(params).exec(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        Image.update({id: id}, params).exec(function(err, result) {
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
    capture: function(req, res) {
        var id = req.param('id');
        var id = req.param('partition');
        res.setTimeout(0);
        req.file('image').upload({}, function whenDone(err, uploadedFiles) {
            if (err) return res.serverError(err);
            return res.json({
                files: uploadedFiles,
                textParams: req.allParams()
            });
        });
    },
    deploy: function(req, res) {
        var id = req.param('id');
        var partition = req.param('partition');
        ImageService.stream(id, partition, res, function(err) {
            if (err) return res.serverError(err);
        });
    }
};

