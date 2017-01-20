/**
 * AssociationService.js
 *
 * @description :: Provide waterline model association manipulators with validations
 *                 This includes things like adding an array of objects to a 1-N  or N-N relationship
 *                 It can also validate 1-1 relation manipulations
 */
'use strict;'

var validateWrapperParameters = function (parent, child, viaAttribute, parentId) {
  if(typeof parent !== 'object' || typeof parent.identity !== 'string' || parent.identity.length === 0 
          || typeof parent.findOne !== 'function')
    return 'Parent parameter is not a model';
  if(typeof child !== 'object' || typeof child.identity !== 'string' || child.identity.length === 0 
          || typeof child.findOne !== 'function')
    return 'Child parameter is not a model';
  if(typeof viaAttribute !== 'string' || viaAttribute.length === 0)
    return 'Invalid viaAttribute';
  if(typeof parentId === 'undefined' || parentId === null)
    return 'Invalid parentId';

  return;
}

var manyAssociationWrapper = function(parent, child, viaAttribute, parentId, childIds, add, next) {
  var validationErr = validateWrapperParameters(parent, child, viaAttribute, parentId);
  if(validationErr) return next(validationErr);
  next = (typeof next !== 'function') ? function() {} : next;

  async.waterfall([
    // Verify that the parent exists
    function(cb) {
      parent.findOne({id: id}).exec(function(err, pResult) {
        if(err) return cb(err);
        if(!pResult) return cb('Could not find ' + parent.identity + ' with that id');
        cb();
      });
    },
    // Verify that the children exist
    function(cb) {
      async.each(childIds, function(childId, nCb) {
        child.findOne({id: childId}).exec(function(err, cResult) {
          if(err) return nCb(err);
          if(!cResult) return nCb('Could not find ' + child.identity + ' with id ' + childId);
          nCb();
        });
      }, cb);
    },
    // Update the parent model
    function(cb) {
      pResult.save(function(err) {
        if(err) return cb(err);
        cb();
      });
    }
  ], function(err, results) {
    if(err) return next(err);
    next();
  });
}

var singleAssociationWrapper = function(parent, child, viaAttribute, parentId, childId, next) {
  var validationErr = validateWrapperParameters(parent, child, viaAttribute, parentId);
  if(validationErr) return next(validationErr);
  next = (typeof next !== 'function') ? function() {} : next;
  if (typeof childId === 'undefined') childId = null;

  async.waterfall([
    // Verify that the parent exists
    function(cb) {
      parent.findOne({id: id}).exec(function(err, pResult) {
        if(err) return cb(err);
        if(!pResult) return cb('Could not find ' + parent.identity + ' with that id');
        cb();
      });
    },
    // Verify that the child exists
    function(cb) {
      // If we are trying to clear the attribute, 
      // skip checking if it corresponds to a valid model
      if (childId === null) return cb();
      child.findOne({id: childId}).exec(function(err, cResult) {
        if(err) return cb(err);
        if(!cResult) return cb('Could not find ' + child.identity + ' with id ' + childId);
        cb();
      });
    },
    // Update the parent model
    function(cb) {
      var payload = {};
      payload[viaAttribute] = childId;
      parent.update({id: parentId}, payload).exec(function(err, updated) {
        if (err) return cb(err);
        cb();
      });
    }
    ], function(err, result) {
      if(err) return next(err);
      next();
    });
}

module.exports = {
  assignMany: function(parent, child, viaAttribute, parentId, childIds, next) {
    manyAssociationWrapper(parent, child, viaAttribute, parentId, childIds, true, next);
  },
  unassignMany: function(parent, child, viaAttribute, parentId, childIds, next) {
    manyAssociationWrapper(parent, child, viaAttribute, parentId, childIds, false, next);
  },
  setSingle: function(parent, child, viaAttribute, parentId, childId, next) {
    singleAssociationWrapper(parent, child, viaAttribute, parentId, childIds, next);
  }
};