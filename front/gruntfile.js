module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: ['dist']
    },
    wiredep: {
      task: {
        src: [
          'src/index.html'
        ],
        overrides: {
          'angular-socket-io': {
            main: 'socket.min.js'
          }
        },
        options: {}
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist',
        flow: {
          steps: {
            js: ['concat', 'uglifyjs'],
            css: ['concat']
          },
          post: {}
        }
      }
    },
    copy: {
      html: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    html2js: {
      options: {
        // custom options, see below
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'src/partials/templates.js'
      },
    },
  });

  grunt.registerTask('min', [
    'clean',
    'html2js',
    'copy',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin'
  ]);

};
