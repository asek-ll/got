module.exports = (mongoose) ->
  Game = mongoose.Schema
    name: String

    created:
      type: Date
      default: Date.now

    status:
      type: String

  mongoose.model 'Game', Game
