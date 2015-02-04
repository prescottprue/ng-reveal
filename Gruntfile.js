'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:unit']);
  grunt.registerTask('serve', ['karma:continuous', 'dist', 'build:gh-pages', 'connect:continuous', 'watch']);
  grunt.registerTask('dist', ['ngAnnotate', 'uglify']);

  grunt.registerTask('build', fakeTargetTask('build'));
  grunt.registerTask('publish', fakeTargetTask('publish'));

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n')
    },

    watch: {
      src: {
        files: ['src/*'],
        tasks: ['karma:unit:run', 'dist', 'build:gh-pages']
      },
      test: {
        files: ['test/*.js'],
        tasks: ['karma:unit:run']
      },
      demo: {
        files: ['demo/*', 'publish.js'],
        tasks: ['build:gh-pages']
      },
      livereload: {
        files: ['out/built/gh-pages/**/*'],
        options: { livereload: true }
      }
    },

    karma: {
      unit: {configFile: 'test/karma.conf.js', singleRun: true},
      coverage : {
        configFile: 'test/karma.conf.js',
        reporters: ['progress', 'coverage'],
        preprocessors: { 'src/*.js': ['coverage'] },
        coverageReporter: { type : 'html', dir : 'coverage/' },
        singleRun: true
      },
      server: {configFile: 'test/karma.conf.js'},
      continuous: {configFile: 'test/karma.conf.js',  background: true }
    },

    connect: {
      options: {
        base : 'demo',
        open: true,
        livereload: true
      },
      server: { options: { keepalive: true } },
      continuous: { options: { keepalive: false } }
    },


    jshint: {
      src: {
        files:{ src : ['src/*.js', 'demo/**/*.js'] },
        options: { jshintrc: '.jshintrc' }
      },
      test: {
        files:{ src : [ 'test/*.spec.js', 'GruntFile.js'] },
        options: grunt.util._.extend({}, grunt.file.readJSON('.jshintrc'), {
          node: true,
          globals: {
            angular: false,
            inject: false,
            jQuery: false,

            jasmine: false,
            afterEach: false,
            beforeEach: false,
            ddescribe: false,
            describe: false,
            expect: false,
            iit: false,
            it: false,
            spyOn: false,
            xdescribe: false,
            xit: false
          }
        })
      }
    },

    uglify: {
      options: {banner: '<%= meta.banner %>'},
      build: {
        expand: true,
        cwd: 'dist',
        src: ['*.js'],
        ext: '.min.js',
        dest: 'dist'
      }
    },

    ngAnnotate: {
      main: {
        expand: true,
        cwd: 'src',
        src: ['*.js'],
        dest: 'dist'
      }
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        from: grunt.option('from')
      }
    }
  });

};
