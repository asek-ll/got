module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
  });

  grunt.registerTask('dev', function () {
    var done = this.async();
    grunt.util.spawn({
      cmd: 'coffee',
      args: ['./server/server.coffee']
    }, function () {
      done();
    });
  });

};
