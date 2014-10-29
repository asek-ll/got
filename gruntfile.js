module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: './src/lib',
    layout: 'byType',
    install: true,
    verbose: false,
    cleanTargetDir: false,
    cleanBowerDir: false,
    bowerOptions: {}
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'dist/_bower.js',
        cssDest: 'dist/_bower.css',
        dependencies: {
          'atomjs': 'requirejs',
          'libcanvas': 'atomjs'
        }
      }
    }
  });

  grunt.registerTask('default', ['bower_concat']);
  grunt.registerTask('install', ['bower']);
};
