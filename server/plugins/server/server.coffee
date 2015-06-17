module.exports = (options, imports, register) ->
    http = require 'http'
    path = require 'path'
    expressIo = require 'express.io'
    express = require 'express'
    
    app = expressIo()
    app.http().io()
    
    router = express.Router()
    
    app.use(express.static(path.join(options.root)))
    
    bodyParser = require 'body-parser'
    app.use bodyParser.json()
    app.use bodyParser.urlencoded
      extended: true
      
    use = ->
      app.use.apply app, arguments

    start = ->

      app.use router
      
      app.all '/*', (req, res) ->
        res.sendfile(path.join options.root, '/index.html')

      app.listen options.port, options.ip, ->
          console.log "server available at " + options.hostname

    register null,
      server:
        start: start
        router: router
        use: use
