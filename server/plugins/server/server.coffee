module.exports = (options, imports, register) ->
    http = require 'http'
    path = require 'path'
    expressIo = require 'express.io'
    express = require 'express'
    
    app = expressIo()
    app.http().io()
    
    router = express.Router()
    
    #setInterval (->
        #app.io.broadcast('hey', {this: 'goes to everyone!'})
        #console.log 'broad'
    #), 5000

    app.use(express.static(path.join(options.root, '/src')))
    #app.use('/dev', express.static(path.join(options.root, '/src')))
    #app.use(express.static(path.join(options.root, '/dist')))

    use = ->
      app.use.apply app, arguments

    start = ->
    

      app.use router
      
      app.all '/*', (req, res) ->
        res.sendfile(path.join options.root, '/src/index.html');

      app.listen options.port, options.ip, ->
          console.log "server available at " + options.hostname

    register null,
      server:
        start: start
        router: router
        use: use
