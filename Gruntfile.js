'use strict';
var util = require('./test/lib/karma-util.js');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // configurable paths
  var myAppConfig = {
    app: 'app',
    config: 'config',
    dist: 'dist'
  };

  grunt.initConfig({
    myApp: myAppConfig,
    watch: {
      livereload: {
        files: [
          '<%= myApp.app %>/{,*/}*.html',
          //'<%= myApp.app %>/i18n/js/{,*/}*.json',
          '{.tmp,<%= myApp.app %>}/css/{,*/}*.css',
          '{.tmp,<%= myApp.app %>}/js/{,*/}*.js',
          '<%= myApp.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 8080,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      app: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, myAppConfig.app)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= myApp.dist %>/*',
            '!<%= myApp.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= myApp.app %>/js/{,*/}*.js'
      ]
    },
    midway: {
    // unit: './config/karma.conf.js',
     midway: './config/karma-midway.conf.js',
    // e2e: './config/karma-e2e.conf.js'
    },
    karma: {
      unit: {
        configFile: '<%= myApp.config %>/karma.conf.js',
        singleRun: false
      },
      e2e: {
        configFile: '<%= myApp.config %>/karma-e2e.conf.js'
      },
      midway: {
        configFile: '<%= myApp.config %>/karma-midway.conf.js'
      }
    },
    concat: {
      dist: {
        files: {
          '<%= myApp.dist %>/js/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= myApp.app %>/js/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= myApp.app %>/index.html',
      options: {
        dest: '<%= myApp.dist %>'
      }
    },
    usemin: {
      html: ['<%= myApp.dist %>/{,*/}*.html'],
      css: ['<%= myApp.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= myApp.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myApp.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= myApp.dist %>/img'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= myApp.dist %>/css/main.css': [
            '.tmp/css/{,*/}*.css',
            '<%= myApp.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myApp.app %>',
          src: ['*.html', 'partials/*.html'],
          dest: '<%= myApp.dist %>'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myApp.dist %>/js',
          src: '*.js',
          dest: '<%= myApp.dist %>/js'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= myApp.dist %>/js/scripts.js': [
            '<%= myApp.dist %>/js/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= myApp.dist %>/js/{,*/}*.js',
            '<%= myApp.dist %>/i18n/{,*/}*.json',
            '<%= myApp.dist %>/css/{,*/}*.css',
            '<%= myApp.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= myApp.dist %>/css/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= myApp.app %>',
          dest: '<%= myApp.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'img/{,*/}*.{gif,webp}',
            'css/fonts/*'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:app',
    'open:server',
    'watch:livereload'
  ]);

  grunt.registerTask('s', 'server');

  grunt.registerTask('test', [
    'clean:server',
    'karma:unit'
  ]);

  grunt.registerTask('t', 'test');

  grunt.registerTask('e2e', [
    'clean:server',
    'connect:app',
    'karma:e2e'
  ]);

  grunt.registerMultiTask('midway', 'Run and watch the unit tests with Karma', function() {
    util.startKarma.call(util, this.data, true, this.async());
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
