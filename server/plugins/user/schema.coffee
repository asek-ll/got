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

    if not user.isModified 'password'
      return next()

    bcrypt.genSalt SALT_WORK_FACTOR, (err, salt) ->
      if  err
        return next(err)

      bcrypt.hash user.password, salt, (err, hash) ->
        if  err
          return next(err)

        user.password = hash
        next()

  User.methods.comparePassword = (candidatePassword, next) ->
    bcrypt.compare candidatePassword, this.password, next

  User.options.toObject = {}
  User.options.toObject.transform = (doc, ret, options) ->
    delete ret.password
    delete ret.__v
    ret

  mongoose.model 'User', User
