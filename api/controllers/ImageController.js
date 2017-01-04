/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
        ImageService.getAll(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        ImageService.get(id, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        ImageService.search(query, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        ImageService.create(params, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        ImageService.update(id, params, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },    
    destroy: function(req, res) {
        var id = req.param('id');
        ImageService.destroy(id, function(err) {
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

