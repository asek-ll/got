module.exports = (options, imports, register) ->

  mongodb = imports.mongodb
  server = imports.server

  Game = (require __dirname + '/schema.coffee')(mongodb.mongoose)

  server.router.get '/api/games', (req, res) ->
    res.json []
    
  server.router.route '/api/games/:id'
  .get (req, res) ->
    res.json {}
      
      
  register null, {}