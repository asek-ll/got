module.exports = (options, imports, register) ->
    server = imports.server
    mongodb = imports.mongodb
    User = (require __dirname + '/schema.coffee')(mongodb.mongoose)

    register null,
      user:
        model: User
