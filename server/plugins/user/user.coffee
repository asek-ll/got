module.exports = (options, imports, register) ->
    server = imports.server
    mongodb = imports.mongodb
    googleStrategy = imports['google-strategy']

    session = require 'express-session'
    passport = require 'passport'
    MongoStore = (require 'connect-mongo')(session)
    User = (require __dirname + '/schema.coffee')(mongodb.mongoose)

    oAuth2Strategy = googleStrategy
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

    passport.use oAuth2Strategy

    passport.serializeUser (user, done) ->
      done null, user._id

    passport.deserializeUser (id, done) ->
      User.findById id, done

    server.use session
      secret: options.cookieSecret
      resave: false
      saveUninitialized: true
      store: new MongoStore
        mongoose_connection: mongodb.connection

    server.use passport.initialize()

    server.use passport.session()

    server.router.get('/auth/google', passport.authenticate('oauth2'))

    server.router.get('/auth/google/return', passport.authenticate('oauth2', { successRedirect: '/', failureRedirect: '/login' }))
    #server.router.get '/auth/google/return', (req, res, next) ->
      #console.log req
      #next()
    
    server.router.get '/user', (req, res, next) ->
      res.json req.user
    
    register null,
      user: User
