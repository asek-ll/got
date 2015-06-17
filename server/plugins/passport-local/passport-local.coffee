module.exports =  (options, imports, register) ->

  passport = require 'passport'
  LocalStrategy = require('passport-local').Strategy
  User = imports.user.model
  server = imports.server

  strategy = new LocalStrategy (username, password, done) ->
    console.log 'execute', username, password
    User.findOne
      username: username
    ,(err, user) ->
      if err
        return done err

      if !user
        return done null, false, message: 'Incorrect username.'

      if !user.checkPassword password
        return done null, false, message: 'Incorrect password.'

      done null, user

  passport.use strategy

  callback = (req, res) ->
    res.json req.user

  server.router.post '/auth/local', passport.authenticate('local'), callback
  register null,
    'passport-local': {}
