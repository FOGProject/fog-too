/**
 * HostController
 *
 * @description :: Server-side logic for managing Hosts
 */

module.exports = {
	list: function(req, res) {
        HostService.getAll(function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    find: function(req, res) {
        var id = req.param('id');
        HostService.get(id, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    search: function(req, res) {
        var query = req.query;
        HostService.search(query, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },   
    create: function(req, res) {
        var params = req.params.all();
        HostService.create(params, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },
    update: function(req, res) {
        var id = req.param('id');
        var params = req.params.all();
        params['id'] = undefined;
        HostService.update(id, params, function(err, result) {
            if (err) return res.serverError(err);
            res.json(result);
        });
    },    
    destroy: function(req, res) {
        var id = req.param('id');
        HostService.destroy(id, function(err) {
            if (err) return res.serverError(err);
            res.json();
        });
    },
    deploy: function(req, res) {
        //fs.createReadStream('C:\Users\schmi\Desktop\ScreenToGif 2.2.exe').pipe(res);
        //HostService.findHost(hostName, function(host) {
        //    res.json(success);
        //});        
    }
};

