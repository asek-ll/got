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
        options: {}
      },
      dist: {
        src: [
          'dist/index.html'
        ],
      }
    },
    useminPrepare: {
      html: 'dist/index.html',
      options: {
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
      dist: {
        src: ['src/**/*.tpl.html'],
        dest: 'dist/templates.js'
      }
    },
    injector: {
      dist: {
        files: {
          'dist/index.html': [
            [
              'src/app/**/*.js',
              'dist/templates.js'
            ],
            'src/css/**/*.css'
          ],
        },
      }
    }
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

  grunt.registerTask('dev', [
    'clean',
    'html2js:dist',
    'copy',
    'wiredep:dist',
    'injector:dist',
  ]);

  grunt.registerTask('rel', [
    'clean',
    'html2js:dist',
    'copy',
    'wiredep:dist',
    'injector:dist',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin'
  ]);


};
