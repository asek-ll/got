module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

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
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js",
          mainConfigFile: "src/js/init.js",
          name: "init", // assumes a production build using almond
          out: "dist/optimized.js"
        }
      }
    }
  });

  grunt.registerTask('install', ['bower']);
  grunt.registerTask('compile', ['requirejs']);
};
