module.exports = (options, imports, register) ->

  mongodb = imports.mongodb
  user = imports.roles.user
  server = imports.server
  _ = require 'lodash'

  Game = (require __dirname + '/schema.coffee')(mongodb.mongoose)

  server.router.route '/api/games'
  .get user.can('view game'), (req, res) ->
    Game.find {}
      .populate 'owner'
      .exec (err, games) ->
        res.json _.map games, (game) ->
           game.toObject()

  .post user.can('create game'), (req, res, next) ->

    gameData = _.extend req.body,
      status: "New"
      owner: req.user._id

    game = new Game gameData

    return game.save ->
      res.json game.toObject()
    
  server.router.route '/api/games/:id'
  .get (req, res) ->
    res.json {}

  server.router.route '/api/games/:id/join'
  .get (req, res) ->
    res.join {}
      
  register null, {}
