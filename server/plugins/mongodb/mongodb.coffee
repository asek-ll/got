module.exports = (options, imports, register) ->

  mongoose = require 'mongoose'

  db = mongoose.connection

  connect = ->
    mongoose.connect options.uri,
      server:
        auto_reconnect: true
    #console.log mongoose
    #console.log db

  db.on 'connectiong', ->
    console.log 'connect to mongodb'

  db.on 'error', (err) ->
    console.log 'err in mongo connection ' + err
    mongoose.disconnect()

  db.once 'open', ->
    console.log 'mongodb connection opened'

  db.on 'reconnected', ->
    console.log 'mongodb reconnected'

  db.on 'disconnected', ->
    console.log 'mongodb disconnected'
    connect()

  connect()

  register null,
    mongodb:
      connection: db
      mongoose: mongoose
