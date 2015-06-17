path = require 'path'
architect = require 'architect'
async = require 'async'

configPath = path.join __dirname, "config.coffee"
config = architect.loadConfig configPath

architect.createApp config, (err, app) ->
  if err
    throw err

  User = app.services.user.model

  async.series [
    (next) -> User.remove {}, next
    (next) ->
      user = new User
        username: 'admin'
        password: '123'
        roles: ['admin']

      user.save(next)
    (next) -> User.find next
  ], (err, result) ->
    if not err
      console.log "done"

      app.services.mongodb.mongoose.disconnect()
