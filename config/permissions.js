module.exports.permissions = {
  stock: {
    group: {create: false, read: false, update: false, destroy: false, register: false, unregister: false},
    host: {create: false, read: false, update: false, destroy: false},
    image: {create: false, read: false, update: false, destroy: false, capture: false, deploy: false},
    role: {create: false, read: false, update: false, destroy: false, assign: false},
    user: {create: false, read: false, update: false, destroy: false},
    workflow: {create: false, read: false, update: false, destroy: false}
  },
};