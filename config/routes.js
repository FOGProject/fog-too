module.exports.routes = {

  '/api': function(req, res) { return res.send('{message: "FOG API Backend"}'); },

  /**
   * Auth API
   */
  'post /api/auth/token': 'AuthController.issueToken',
  'post /api/auth/login': 'AuthController.login',
  'post /api/auth/logout': 'AuthController.logout',

  /**
   * User API
   */
  'get /api/user': 'UserController.list',
  'get /api/user/search': 'UserController.search',
  'get /api/user/me': 'UserController.listMe',  
  'get /api/user/:id': 'UserController.find',
  'post /api/user': 'UserController.create',
  'put /api/user': 'UserController.update',
  'delete /api/user': 'UserController.destroy',  

  /**
   * Role API
   */
  'get /api/role': 'RoleController.list',
  'get /api/role/search': 'RoleController.search',
  'get /api/role/:id': 'RoleController.find',
  'post /api/role': 'RoleController.create',
  'put /api/role': 'RoleController.update',
  'delete /api/role': 'RoleController.destroy',  
  'put /api/role/:id/assign': 'RoleController.assign',
  'put /api/role/:id/unassign': 'RoleController.unassign',

  /**
   * Host API
   */
  'get /api/host': 'HostController.list',
  'get /api/host/search': 'HostController.search',
  'get /api/host/:id': 'HostController.find',
  'post /api/host': 'HostController.create',
  'put /api/host': 'HostController.update',
  'delete /api/host': 'HostController.destroy',

  /**
   * Group API
   */
  'get /api/group': 'GroupController.list',
  'get /api/group/search': 'GroupController.search',
  'get /api/group/:id': 'GroupController.find',
  'post /api/group': 'GroupController.create',
  'put /api/group': 'GroupController.update',
  'delete /api/group': 'GroupController.destroy',
  'put /api/group/:id/register': 'GroupController.registerHost',
  'put /api/group/:id/unregister': 'GroupController.unregisterHost',

  /**
   * Image API
   */
  'get /api/image': 'ImageController.list',
  'get /api/image/search': 'ImageController.search',
  'get /api/image/:id': 'ImageController.find',
  'post /api/image': 'ImageController.create',
  'put /api/image': 'ImageController.update',
  'delete /api/image': 'ImageController.destroy',
  'get /api/image/:id/deploy/:partition': 'ImageController.deploy',
  'put /api/image/:id/capture/:partition': 'ImageController.capture',

  /**
   * Workflow API
   */
  'get /api/workflow': 'WorkflowController.list',
  'get /api/workflow/search': 'WorkflowController.search',
  'get /api/workflow/:id': 'WorkflowController.find',
  'post /api/workflow': 'WorkflowController.create',
  'put /api/workflow': 'WorkflowController.update',
  'delete /api/workflow': 'WorkflowController.destroy',

  /**
   * Task API
   */
  'get /api/task': 'TaskController.list',
  'get /api/task/search': 'TaskController.search',
  'get /api/task/:id': 'TaskController.find',
  'post /api/task': 'TaskController.create',
  'put /api/task': 'TaskController.update',
  'delete /api/task': 'TaskController.destroy',
};
