path = require 'path'
architect = require 'architect'

configPath = path.join __dirname, "config.coffee"
config = architect.loadConfig configPath

architect.createApp config, (err, app) ->
    if err
        throw err
        
    app.services.server.start()
