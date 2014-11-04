module.exports = (options, imports, register) ->

  mongodb = imports.mongodb
  server = imports.server

  Game = (require __dirname + '/schema.coffee')(mongodb.mongoose)

  server.router.route('/games').get (req, res, next) ->
    if req.hasPerm "view games"
      
      
