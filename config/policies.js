/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  GroupController: {
    list: ['isAuthenticated', 'groupRead'],
    find: ['isAuthenticated', 'groupRead'],
    search: ['isAuthenticated', 'groupRead'],
    create: ['isAuthenticated', 'groupCreate'],
    update: ['isAuthenticated', 'groupUpdate'],
    destroy: ['isAuthenticated', 'groupDestroy'],
    registerHost: ['isAuthenticated', 'groupRegister'],
    unregisterHost: ['isAuthenticated', 'groupUnregister'],    
  },

  HostController: {
    list: ['isAuthenticated', 'hostRead'],
    find: ['isAuthenticated', 'hostRead'],
    search: ['isAuthenticated', 'hostRead'],
    create: ['isAuthenticated', 'hostCreate'],
    update: ['isAuthenticated', 'hostUpdate'],
    destroy: ['isAuthenticated', 'hostDestroy'],
  },

  ImageController: {
    list: ['isAuthenticated', 'imageRead'],
    find: ['isAuthenticated', 'imageRead'],
    search: ['isAuthenticated', 'imageRead'],
    create: ['isAuthenticated', 'imageCreate'],
    update: ['isAuthenticated', 'imageUpdate'],
    destroy: ['isAuthenticated', 'imageDestroy'],
    deploy: ['isAuthenticated', 'imageDeploy'],
    capture: ['isAuthenticated', 'imageCapture'],
  }, 

   RoleController: {
    list: ['isAuthenticated', 'roleRead'],
    find: ['isAuthenticated', 'roleRead'],
    search: ['isAuthenticated', 'roleRead'],
    create: ['isAuthenticated', 'roleCreate'],
    update: ['isAuthenticated', 'roleUpdate'],
    destroy: ['isAuthenticated', 'roleDestroy'],
    assign: ['isAuthenticated', 'roleAssign']
  },

  UserController: {
    list: ['isAuthenticated', 'userRead'],
    find: ['isAuthenticated', 'userRead'],
    search: ['isAuthenticated', 'userRead'],
    create: ['isAuthenticated', 'userCreate'],
    update: ['isAuthenticated', 'userUpdate'],
    destroy: ['isAuthenticated', 'userDestroy'],
  },

  WorkflowController: {
    list: ['isAuthenticated', 'workflowRead'],
    find: ['isAuthenticated', 'workflowRead'],
    search: ['isAuthenticated', 'workflowRead'],
    create: ['isAuthenticated', 'workflowCreate'],
    update: ['isAuthenticated', 'workflowUpdate'],
    destroy: ['isAuthenticated', 'workflowDestroy'],
  }, 
};
