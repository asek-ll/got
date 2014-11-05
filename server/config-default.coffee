module.exports = [
  {
    packagePath: './plugins/server'
    root: __dirname + '/../front'
    port: 3000
    ip: "0.0.0.0"
    hostname: "http://localhost:3000"
  }
  {
    packagePath: './plugins/user'
    clientID: ''
    clientSecret: ''
    callbackURL: 'http://localhost:3000/auth/google/return'
    cookieSecret: ''
    allowedEmails: []
  }
  {
    packagePath:'./plugins/google-passport-strategy'
  }
  {
    packagePath:'./plugins/mongodb'
    uri: ''
  }
  {
    packagePath: './plugins/roles'
  }
  {
    packagePath: './plugins/game'
  }
]
