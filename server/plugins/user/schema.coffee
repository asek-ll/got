module.exports = (mongoose) ->
  User = mongoose.Schema
    name: String
    googleId: String
    roles: [String]

  mongoose.model 'User', User
