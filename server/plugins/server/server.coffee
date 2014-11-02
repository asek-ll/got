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

    use = ->
      app.use.apply app, arguments

    start = () ->
    
        app.use('/dev', express.static(path.join(options.root, '/src')))
        app.use(express.static(path.join(options.root, '/dist')))
        
        app.use(router)
        
        console.log process.env.PORT || 3000, process.env.IP || "0.0.0.0"
        app.listen process.env.PORT || 3000, process.env.IP || "0.0.0.0", () ->
            console.log "start"
    
    register null,
        server:
            start: start
            router: router
            use: use
