module.exports = [
  {
    "name": "Administrator",
    "isAdmin": true,
    "permissions": {},
    "users": [1]
  },
  {
    "name": "NoPermissions",
    "isAdmin": false,
    "permissions": {},
    "users": [2]
  },
  {
    "name": "HostCreateControl",
    "isAdmin": false,
    "permissions": {stock:{host:{create: true}}},
    "users": [4,5]
  },  
  {
    "name": "GroupCreateontrol",
    "isAdmin": false,
    "permissions": {stock:{group:{create: true}}},
    "users": [5],
  },    
  {
    "name": "ToUpdate",
    "isAdmin": false,
    "permissions": {}
  },
  {
    "name": "ToDestroy",
    "isAdmin": false,
    "permissions": {}
  },    
]