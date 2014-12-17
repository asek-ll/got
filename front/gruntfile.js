module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      templates: {
        files: ['src/app/**/*.tpl.html'],
        tasks: ['html2js:main']
      }
    },
    clean: {
      dist: ['dist']
    },
    wiredep: {
      src: {
        src: [
          'src/index.html'
        ],
      },
      dist: {
        src: [
          'dist/index.html'
        ],
      }
    },
    useminPrepare: {
      html: 'src/index.html',
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
        base: 'src/app'
      },
      main: {
        src: ['src/app/**/*.tpl.html'],
        dest: 'src/templates/app.js'
      },
      dist: {
        src: ['src/**/*.tpl.html'],
        dest: 'dist/templates.js'
      }
    },
    injector: {
      options: {
        ignorePath: ['src'],
        addRootSlash: false
      },
      src: {
        files: {
          'src/index.html': [
            [
              'src/templates/*.js',
              'src/app/**/*.js'
            ],
            'src/css/**/*.css'
          ],
        }
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
    'html2js:main',
    'wiredep:src',
    'injector:src',
    'watch'
  ]);

  grunt.registerTask('rel', [
    'clean',
    'html2js:dist',
    'copy',
    'wiredep:src',
    'injector:src',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin'
  ]);

};
