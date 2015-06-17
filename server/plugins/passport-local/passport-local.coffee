module.exports =  (options, imports, register) ->

  LocalStrategy = require('passport-local').Strategy
  User = imports.user.model
  passport = imports.passport
  server = imports.server

  strategy = new LocalStrategy (username, password, done) ->
    User.findOne
      username: username
    ,(err, user) ->
      if err
        return done err

      if !user
        return done null, false, message: 'Incorrect username.'

      user.comparePassword password, (err, isMatch) ->
        if err or not isMatch
          return done null, false, message: 'Incorrect password.'

        done null, user

  passport.use strategy

  callback = (req, res) ->
    res.json req.user

  server.router.post '/auth/local', passport.authenticate('local'), callback

  register null, {}
