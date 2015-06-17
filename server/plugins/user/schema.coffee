module.exports = (mongoose) ->
  bcrypt = require 'bcrypt'
  SALT_WORK_FACTOR = 10

  User = mongoose.Schema
    username:
      type: String
      required: true
      index:
        unique: true

    password:
      type: String
      required: true

    googleId: String
    roles: [String]

  User.pre 'save', (next) ->
    user = this

    if not user.isModified password
      return next()

    bcrypt.genSalt SALT_WORK_FACTOR, (err, salt) ->
      if  err
        return next(err)

      bcrypt.hash user.password, salt, (err, hash) ->
        if  err
          return next(err)

        user.password = hash
        next()

  User.methods.comparePassword = (candidatePassword, cb) ->
    bcrypt.compare candidatePassword, this.password, (err, isMatch) ->
      if err
        return cb(err)

      cb(null, isMatch)

  mongoose.model 'User', User
