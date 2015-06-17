module.exports = (options, imports, register) ->
  server = imports.server
  mongodb = imports.mongodb
  session = require 'express-session'
  MongoStore = (require 'connect-mongo')(session)

  server.use session
    secret: options.cookieSecret
    resave: false
    saveUninitialized: true
    store: new MongoStore
      db: mongodb.connection.db

  
  server.router.get '/user', (req, res, next) ->
    res.json req.user
    
  register null,
    session: {}

