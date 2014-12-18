module.exports = (mongoose) ->
  ObjectId = mongoose.Schema.Types.ObjectId

  Game = mongoose.Schema
    name: String

    created:
      type: Date
      default: Date.now

    status:
      type: String

    owner:
      type: ObjectId
      ref: 'User'

  mongoose.model 'Game', Game
