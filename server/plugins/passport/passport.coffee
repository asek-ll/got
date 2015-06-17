module.exports = (options, imports, register) ->
  server = imports.server
  User = imports.user.model

  passport = require 'passport'

  passport.serializeUser (user, done) ->
    done null, user._id

  passport.deserializeUser (id, done) ->
    User.findById id, (err, user) ->
      console.log(arguments,'des')
      if user
        done err, user.toObject()
      else
        done err, {}

  server.use passport.initialize()
  server.use passport.session()

  register null,
    passport: passport
