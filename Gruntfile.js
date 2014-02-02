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

        // Project paths
        scaffold: {
            sourceDir: 'src/',
            bowerDir: 'bower_components/',
            buildRoot: 'build/',
            tmpDir: 'build/.tmp/',
            assetDir: 'build/.tmp/asset/',
            concatDir: 'build/.tmp/concat/',
            htmlDir: 'build/.tmp/html/',
            distDir: 'build/dist/'
        },

        clean: {
            build: ['<%= scaffold.tmpDir %>'],
            release: ['<%= scaffold.distDir %>'],
            fonts: ['<%= scaffold.sourceDir %>asset/fonts/']
        },

        useminPrepare: {
            html: '<%= scaffold.sourceDir %>index.html',
            options: {
                staging: '<%= scaffold.tmpDir %>',
                dest: '<%= scaffold.distDir %>'
            }
        },

        usemin: {
            html: '<%= scaffold.htmlDir %>index.html'
        },

        ngmin: {
            app: {
                src: ['<%= scaffold.concatDir %>js/app.js'],
                dest: '<%= scaffold.concatDir %>js/app.js'
            }
        },

        copy: {
            prepare: {
                // Bower fonts
                cwd: '<%= scaffold.bowerDir %>bootstrap/dist/',
                src : ['fonts/*.*'],
                dest: '<%= scaffold.sourceDir %>asset/',
                expand: true
            },
            build: {
                files: [{
                    // HTML index
                    cwd: '<%= scaffold.sourceDir %>',
                    src: ['index.html'],
                    dest: '<%= scaffold.htmlDir %>',
                    expand: true
                }, {
                    // HTML templates
                    cwd: '<%= scaffold.sourceDir %>app/',
                    src : ['**/*.tpl.html'],
                    dest: '<%= scaffold.htmlDir %>view/',
                    expand: true,
                    flatten: true
                }, {
                    // Assets (fonts, img, ico)
                    cwd: '<%= scaffold.sourceDir %>',
                    src : ['asset/**/*.*'],
                    dest: '<%= scaffold.tmpDir %>',
                    expand: true
                }]
            },

            // Optimize: copy complete folder structure
            release: {
                files: [{
                    // HTML index and templates
                    cwd: '<%= scaffold.htmlDir %>',
                    src : ['**'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }, {
                    // Fonts and images
                    cwd: '<%= scaffold.assetDir %>',
                    src : ['**'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }]
            }
        }

        // @todo organize task: dev -> release -> test -> server
        // @todo html2js!
        // @todo concurrent task
    });

    // Task registration
    grunt.registerTask('default', [
        'clean',
        'copy:prepare',
        'useminPrepare',
        'copy:build',
        'concat',
        'ngmin',
        'uglify',
        'cssmin',
        'usemin',
        'copy:release',
        'clean:fonts'
    ]);

    grunt.registerTask('asset', ['copy:prepare', 'copy:asset']);
};
