module.exports = (mongoose) ->
  User = mongoose.Schema
    name: String
    googleId: String

  mongoose.model 'User', User
