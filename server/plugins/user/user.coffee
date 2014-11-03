module.exports = (options, imports, register) ->
    server = imports.server
    googleStrategy = imports['google-strategy']

    passport = require 'passport'

    oAuth2Strategy = googleStrategy
      clientID: options.clientID
      clientSecret: options.clientSecret
      callbackURL: options.callbackURL
    , (accessToken, refreshToken, profile, done) ->
      console.log profile
      done null, {}

    passport.use oAuth2Strategy

    passport.serializeUser (user, done) ->
      done null, user

    passport.deserializeUser (user, done) ->
      done null, user

    server.use passport.initialize()

    server.router.get('/auth/google', passport.authenticate('oauth2'))

    server.router.get('/auth/google/return', passport.authenticate('oauth2', { successRedirect: '/', failureRedirect: '/login' }))
    #server.router.get '/auth/google/return', (req, res, next) ->
      #console.log req
      #next()
    
    server.router.get '/user', (req, res, next) ->
        res.json
            name: 'some name'
            id: 1
    
    register null, ->
