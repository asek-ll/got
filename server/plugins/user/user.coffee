module.exports = (options, imports, register) ->
    server = imports.server
    
    server.router.get '/user', (req, res, next) ->
        res.json 
            name: 'some name'
            id: 1
    
    register null, () ->