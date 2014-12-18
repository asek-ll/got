module.exports = (options, imports, register) ->
    
  server = imports.server
  _ = require 'lodash'
  
  roleCache =
      anonymouse: ['view games']
      admin: ['create game', 'view games']
  
  getPermForRole = (role) ->
      roleCache[role]
      
  getPermsForRoles = (roles) ->
    _.reduce roles, (perms, role) ->
      perms.concat getPermForRole role
    , []
  
  server.use (req, res, next) ->
    if req.user
      roles = req.user.roles
    else
      roles = ['anonymouse']

    perms = getPermsForRoles roles
    
    req.hasPerm = (perm) ->
      perms.indexOf(perm) >= 0
      
    if req.user
      req.user.perms = perms
    
    next()
    
  register null, {}
