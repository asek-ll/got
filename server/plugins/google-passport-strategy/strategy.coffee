module.exports = (options, imports, register) ->
  OAuth2Strategy = (require 'passport-oauth2').Strategy
  _ = require 'lodash'

  getStrategy = (options, callback) ->
    oAuth2Strategy = new OAuth2Strategy _.extend(
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth'
      tokenURL: 'https://accounts.google.com/o/oauth2/token'
      scope: 'email'
    , options), callback

    oAuth2Strategy.userProfile = (accessToken, done) ->
      oAuth2Strategy._oauth2.get 'https://www.googleapis.com/oauth2/v1/userinfo', accessToken, (err, data, res)->

        try
          parsed = JSON.parse data
        catch ex
          return done err, {}

        done err, parsed

    oAuth2Strategy

  register null,
    'google-strategy': getStrategy
