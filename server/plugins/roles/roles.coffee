module.exports = (options, imports, register) ->
    
  server = imports.server
  ConnectRoles = require 'connect-roles'

  roles = new ConnectRoles {}

  roles.use 'create game', (req) ->
    req.user.role == 'admin'

  roles.use (req, action) ->
    if not req.isAuthenticated()
      action == 'view game'

  server.use (roles.middleware())
    
  register null,
    roles:
      user: roles
