var path = require('path');
var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;
var progress = require('progress-stream');
var imageDir = path.join(__dirname, '../../images');

module.exports = {
  get: function(id, next) {  
    Image.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Image.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Image.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    Image.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('image.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    Image.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('image.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    Image.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('image.destroy', result);
      next(null, result);
    });
  },
  stream: function(id, partition, target, next) {
    ImageService.aquireReadLock(id, function(err, image) {
      if(err) return next(err);
      if(!image) return next("Image not found");
      var partitionPath = path.join(imageDir, id, partition + ".img");
      sails.log.info("Reading: " + partitionPath);
      fs.exists(partitionPath, function (exists) {
        if (!exists) return next("Partition file does not exist");
        fs.stat(partitionPath, function(err, stat) {
          // Setup the streams
          var stream = fs.createReadStream(partitionPath);
          var progressStream = progress({ length: stat.size, time: 100 });
          stream.on('error', function(err) {
            next(err);
          });
          progressStream.on('progress', function(progress) {
            BusService.publish('image.deploy', progress);
            sails.log.verbose(progress);
          });

          // Begin the transfer
          stream.pipe(progressStream).pipe(target);
        });

      });
    });
  },
  aquireWriteLock: function(id, next) {
    Image.native(function(err, collection) {
      if (err) return next(err);
      collection.update({_id: new ObjectId(id), writeLock: false, readers: 0}, {$set:{writeLock: true}}, function(err, image) {
        next(err, image);
      });
    });
  },
  releaseWriteLock: function(id, next) {
    Image.update({id: id}, {writeLock:false}, function(err, image) {
      next(err, image);
    });
  },
  aquireReadLock: function(id, next) {
    Image.native(function(err, collection) {
      if (err) return next(err);
      collection.update({_id: new ObjectId(id), writeLock: false}, {$inc:{readers: 1}}, function(err, image) {
        next(err, image);
      });
    });    
  },
  releaseReadLock: function(id, next) {
    Image.native(function(err, collection) {
      if (err) return next(err);
      collection.update({_id: new ObjectId(id), readers: {$gt:0}}, {$inc:{readers: -1}}, function(err, image) {
        next(err, image);
      });
    });    
  }
};