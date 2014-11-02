module.exports = (options, imports, register) ->
  nconf = require 'nconf'
  nconf.file options.file

  register null,
    config: nconf 
