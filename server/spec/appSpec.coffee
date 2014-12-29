app = require '../server.coffee'

describe 'base app functionality', ->
  it 'app should have config', ->
    expect(app.config).not.toBeNull()

  it 'app should created', (done) ->
     app.createApp (app) ->
       exect(app).not.toBeNull()
       done()

