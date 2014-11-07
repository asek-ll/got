module.exports = (options, imports, register) ->

  mongodb = imports.mongodb
  server = imports.server
  _ = require 'lodash'

  Game = (require __dirname + '/schema.coffee')(mongodb.mongoose)

  server.router.route '/api/games'
  .get (req, res) ->
    Game.find {}, (err, games) ->
      res.json _.map games, (game) ->
         game.toObject()

  .post (req, res, next) ->
    gameData = req.body

    if req.hasPerm 'create game'
      gameData.status = "New"
      game = new Game gameData
      return game.save ->
        res.json game.toObject()

    res.status(403).end()
    
  server.router.route '/api/games/:id'
  .get (req, res) ->
    res.json {}
      
      
  register null, {}
