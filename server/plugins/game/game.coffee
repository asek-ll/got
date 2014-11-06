module.exports = (options, imports, register) ->

  mongodb = imports.mongodb
  server = imports.server

  Game = (require __dirname + '/schema.coffee')(mongodb.mongoose)

  server.router.route '/api/games'
  .get (req, res) ->
    res.json []
  .post (req, res, next) ->
    game = req.body
    console.log game.name
    
  server.router.route '/api/games/:id'
  .get (req, res) ->
    res.json {}
      
      
  register null, {}