path = require 'path'
architect = require 'architect'

configPath = path.join __dirname, "config.coffee"
config = architect.loadConfig configPath

createApp = (next) ->
  architect.createApp config, (err, app) ->
    if err
      throw err

    next app

startApp = (app) ->
  app.services.server.start()

if !module.parent
  createApp (app) ->
    startApp app

module.exports =
  createApp: createApp
  config: config
  startApp: startApp

