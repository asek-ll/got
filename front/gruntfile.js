module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    src: {
      templates: 'src/app/**/*.tpl.html',
      js: 'src/app/**/*.js',
      css: 'src/styles/css/**/*.css',
      html: 'src/index.html',
      bootstrapCss: '.tmp/bootstrap.css'
    },
    watch: {
      templates: {
        files: ['<%= src.templates %>'],
        tasks: ['html2js:dev']
      },
      js: {
        files: ['<%= src.js %>'],
        tasks: ['concat:js']
      },
      css: {
        files: ['<%= src.css %>'],
        tasks: ['concat:css']
      },
      html: {
        files: ['<%= src.html %>'],
        tasks: ['copy', 'vendor-sources']
      }
    },
    clean: {
      dist: ['dist']
    },
    wiredep: {
      dist: {
        src: [
          'dist/index.html'
        ],
      }
    },
    useminPrepare: {
      dist: {
        src: ['dist/index.html']
      },
      options: {
        flow: {
          steps: {
            js: ['concat', 'uglifyjs'],
            css: ['concat', 'cssmin']
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
        base: 'src/app',
        module: 'app-templates'
      },
      dev: {
        src: ['<%= src.templates %>'],
        dest: 'dist/templates.js'
      },
      dist: {
        src: ['<%= src.templates %>'],
        dest: '.tmp/templates.js'
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/style.css': ['<%= src.css %>', '<%= src.bootstrapCss %>']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/app.js': ['<%= src.js %>'],
          'dist/templates.js': ['<%= html2js.dist.dest %>'],
        }
      }
    },
    concat: {
      js: {
        src: ['<%= src.js %>'],
        dest: 'dist/app.js',
      },
      css: {
        src: ['<%= src.css %>', '<%= src.bootstrapCss %>'],
        dest: 'dist/style.css',
      }
    },
    less: {
      bootstrap: {
        options: {
          strictMath: true,
          paths: ['node_modules/bootstrap/less']
        },
        src: 'src/styles/bootstrap/bootstrap.less',
        dest: '<%= src.bootstrapCss %>'
      }
    }
  });

  grunt.registerTask('vendor-sources', [
    'copy',
    'wiredep:dist',
    'useminPrepare:dist',
    'concat:generated',
    'uglify:generated',
    'cssmin:generated',
    'usemin',
  ]);

  grunt.registerTask('dev', [
    'clean',
    'copy',
    'vendor-sources',
    'html2js:dev',
    'concat:js',
    'less:bootstrap',
    'concat:css',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'clean',
    'copy',
    'vendor-sources',
    'html2js:dist',
    'uglify:dist',
    'less:bootstrap',
    'cssmin:dist'
  ]);

};
