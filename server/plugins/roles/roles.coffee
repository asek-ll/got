module.exports = (options, imports, register) ->
    
  server = imports.server
  ConnectRoles = require 'connect-roles'

  roles = new ConnectRoles {}

  roles.use 'create game', (req) ->
    req.user.roles.indexOf('admin') >= 0

  roles.use (req, action) ->
    if not req.isAuthenticated()
      return action == 'view game'
    
    true

  server.use (roles.middleware())
    
  register null,
    roles:
      user: roles
