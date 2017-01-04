/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': function(req, res) { return res.send('FOG Backend'); },
  
  /**
   * Host API
   */
  'get /host': {
    controller: 'HostController',
    action: 'list',
    skipAssets: true
  },
  'get /host/search' : {
    controller: 'HostController',
    action: 'search',
    skipAssets: true
  },
  'get /host/:id': {
    controller: 'HostController',
    action: 'find',
    skipAssets: true
  },
  'post /host': {
    controller: 'HostController',
    action: 'create',
    skipAssets: true
  },
  'put /host/:id': {
    controller: 'HostController',
    action: 'update',
    skipAssets: true
  },  
  'delete /host/:id': {
    controller: 'HostController',
    action: 'destroy',
    skipAssets: true
  }, 

  /**
   * Group API
   */
  'get /group': {
    controller: 'GroupController',
    action: 'list',
    skipAssets: true
  },
  'get /group/search' : {
    controller: 'GroupController',
    action: 'search',
    skipAssets: true
  },
  'get /group/:id': {
    controller: 'GroupController',
    action: 'find',
    skipAssets: true
  },
  'post /group': {
    controller: 'GroupController',
    action: 'create',
    skipAssets: true
  },
  'put /group/:id': {
    controller: 'GroupController',
    action: 'update',
    skipAssets: true
  },
  'put /group/:id/register': {
    controller: 'GroupController',
    action: 'registerHost',
    skipAssets: true
  },
  'put /group/:id/unregister': {
    controller: 'GroupController',
    action: 'unregisterHost',
    skipAssets: true
  },
  'delete /group/:id': {
    controller: 'GroupController',
    action: 'destroy',
    skipAssets: true
  },

  /**
   * Image API
   */
  'get /image': {
    controller: 'ImageController',
    action: 'list',
    skipAssets: true
  },
  'get /image/:id/deploy/:partition': {
    controller: 'ImageController',
    action: 'deploy',
    skipAssets: true
  },    
  'get /image/search' : {
    controller: 'ImageController',
    action: 'search',
    skipAssets: true
  },
  'get /image/:id': {
    controller: 'ImageController',
    action: 'find',
    skipAssets: true
  },
  'post /image': {
    controller: 'ImageController',
    action: 'create',
    skipAssets: true
  },
  'put /image/:id': {
    controller: 'ImageController',
    action: 'update',
    skipAssets: true
  },
  'put /image/:id/capture/:partition': {
    controller: 'ImageController',
    action: 'capture',
    skipAssets: true
  },
  'delete /image/:id': {
    controller: 'ImageController',
    action: 'destroy',
    skipAssets: true
  },   
};
