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
    
        options: { }
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
    copy:{
	    html: {
	    	src: 'src/index.html', dest: 'dist/index.html'
	    }
	  },

  usemin: {
    html: ['dist/index.html']
  }
  });
  
 grunt.registerTask('min',[
     'clean',
     'copy',
 'useminPrepare',
  'concat:generated',
  'uglify:generated',
  'usemin'
 ]); 
  
};