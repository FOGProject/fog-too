module.exports.routes = {

  '/': function(req, res) { return res.send('FOG Backend'); },

  /**
   * Auth API
   */
  'post /auth/token': 'AuthController.issueToken',
  'post /auth/login': 'AuthController.login',
  'post /auth/logout': 'AuthController.logout',

  /**
   * User API
   */
  'get /user': 'UserController.list',
  'get /user/search': 'UserController.search',
  'get /user/:id': 'UserController.find',
  'post /user': 'UserController.create',
  'put /user': 'UserController.update',
  'delete /user': 'UserController.destroy',  

  /**
   * Role API
   */
  'get /role': 'RoleController.list',
  'get /role/search': 'RoleController.search',
  'get /role/:id': 'RoleController.find',
  'post /role': 'RoleController.create',
  'put /role': 'RoleController.update',
  'delete /role': 'RoleController.destroy',  
  'put /role/:id/assign': 'RoleController.assign',

  /**
   * Host API
   */
  'get /host': 'HostController.list',
  'get /host/search': 'HostController.search',
  'get /host/:id': 'HostController.find',
  'post /host': 'HostController.create',
  'put /host': 'HostController.update',
  'delete /host': 'HostController.destroy',

  /**
   * Group API
   */
  'get /group': 'GroupController.list',
  'get /group/search': 'GroupController.search',
  'get /group/:id': 'GroupController.find',
  'post /group': 'GroupController.create',
  'put /group': 'GroupController.update',
  'delete /group': 'GroupController.destroy',
  'put /group/:id/register': 'GroupController.registerHost',
  'put /group/:id/unregister': 'GroupController.unregisterHost',

  /**
   * Image API
   */
  'get /image': 'ImageController.list',
  'get /image/search': 'ImageController.search',
  'get /image/:id': 'ImageController.find',
  'post /image': 'ImageController.create',
  'put /image': 'ImageController.update',
  'delete /image': 'ImageController.destroy',
  'get /image/:id/deploy/:partition': 'ImageController.deploy',
  'put /image/:id/capture/:partition': 'ImageController.capture',

  /**
   * Workflow API
   */
  'get /workflow': 'WorkflowController.list',
  'get /workflow/search': 'WorkflowController.search',
  'get /workflow/:id': 'WorkflowController.find',
  'post /workflow': 'WorkflowController.create',
  'put /workflow': 'WorkflowController.update',
  'delete /workflow': 'WorkflowController.destroy',

  /**
   * Task API
   */
  'get /task': 'TaskController.list',
  'get /task/search': 'TaskController.search',
  'get /task/:id': 'TaskController.find',
  'post /task': 'TaskController.create',
  'put /task': 'TaskController.update',
  'delete /task': 'TaskController.destroy',
};
