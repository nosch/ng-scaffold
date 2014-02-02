/**
 * ng-scaffold
 * Grunt task runner configuration.
 */
module.exports = function (grunt) {
    'use strict';

    // load all required Grunt plugins listed in package.json
    require('load-grunt-tasks')(grunt);

    // display the elapsed execution time of all tasks
    require('time-grunt')(grunt);

    // Task configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // project settings
        scaffold: {
            buildDir: '.tmp',
            releaseDir: 'dist'
        },

        clean: {
            build: ['<%= scaffold.buildDir %>'],
            release: ['<%= scaffold.releaseDir %>']
        },

        useminPrepare: {
            html: 'src/index.html'
        },

        usemin: {
            html: '.tmp/html/index.html'
        },

        ngmin: {
            app: {
                src: ['.tmp/concat/js/app.js'],
                dest: '.tmp/concat/js/app.js'
            }
        },

        copy: {
            build: {
                files: [{
                    src: 'src/index.html',
                    dest: '.tmp/html/index.html'
                }, {
                    src: 'src/robot.txt',
                    dest: '.tmp/html/robot.txt'
                }, {
                    src: 'src/asset/favicon.ico',
                    dest: '.tmp/asset/favicon.ico'
                }, {
                    cwd: 'bower_components/bootstrap/dist/fonts',
                    src : ['*'],
                    dest: '.tmp/asset/fonts',
                    expand: true
                }, {
                    cwd: 'src/asset/img/',
                    src : ['*'],
                    dest: '.tmp/asset/img',
                    expand: true
                }, {
                    cwd: 'src/app/',
                    src : ['**/*.tpl.html'],
                    dest: '.tmp/html/view/',
                    expand: true,
                    flatten: true
                }]
            },

            // Optimize: copy complete folder structure
            release: {
                files: [{
                    src: '.tmp/html/index.html',
                    dest: 'dist/index.html'
                }, {
                    cwd: '.tmp/html/view/',
                    src : ['*'],
                    dest: 'dist/view/',
                    expand: true
                }, {
                    cwd: '.tmp/asset/',
                    src : ['**/*'],
                    dest: 'dist/',
                    expand: true
                }]
            }
        }

        // @todo organize task: dev -> release -> test -> server
        // @todo copy complete folder structure to dist!!!
        // @todo copy assets in one process
        // @todo optimize images
        // @todo minifize index.html
        // @todo html2js!
        // @todo clean task
        // @todo concurrent task
    });

    // Task registration
    grunt.registerTask('default', [
        'clean',
        'useminPrepare',
        'copy:build',
        'concat',
        'ngmin',
        'uglify',
        'cssmin',
        'usemin',
        'copy:release'
    ]);


};
