module.exports = (options, imports, register) ->
  passport = imports.passport
  server = imports.server
  User = imports.user.model

  OAuth2Strategy = (require 'passport-oauth2').Strategy

  oAuth2Strategy = new OAuth2Strategy
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth'
    tokenURL: 'https://accounts.google.com/o/oauth2/token'
    scope: 'email'
    clientID: options.clientID
    clientSecret: options.clientSecret
    callbackURL: options.callbackURL
    , (accessToken, refreshToken, profile, done) ->
      User.findOne
        googleId: profile.id
      , (err, user) ->

        if err
          return done err, {}

        if user
          return done null, user

        isAllowed = options.allowedEmails.indexOf(profile.email) >= 0

        if isAllowed
          user = new User
            googleId: profile.id
            name: profile.name

          return user.save (err) ->
            return done err, user

        done null, {}

  oAuth2Strategy.userProfile = (accessToken, done) ->
    oAuth2Strategy._oauth2.get 'https://www.googleapis.com/oauth2/v1/userinfo', accessToken, (err, data, res)->

      try
        parsed = JSON.parse data
      catch ex
        return done err, {}

      done err, parsed

  passport.use oAuth2Strategy

  server.router.get '/auth/google', passport.authenticate('oauth2')

  server.router.get '/auth/google/return', passport.authenticate('oauth2', { successRedirect: '/', failureRedirect: '/login' })
    
  register null, {}
