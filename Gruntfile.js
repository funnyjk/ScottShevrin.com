// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/src/js/*.js','public/src/js/**/*.js'] 
    },

  // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
        }
      }
    },

    // // CSS TASKS ===============================================================
    // // process the less file to style.css
    sass: {
      dist: {
        files: {
          'public/dist/style/style.css': 'public/src/style/style.scss'
        }        
      }
    },

  // // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/style/style.min.css': 'public/dist/style/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
     css: {
        files: ['public/src/style/style.scss', 'public/src/style/app/**/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: ['public/src/js/*.js','public/src/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

  // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

  // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};