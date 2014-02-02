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

        // @todo html2js!
        // @todo concurrent task

        clean: {
            tmp: ['<%= scaffold.tmpDir %>'],
            dist: ['<%= scaffold.distDir %>'],
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
            fonts: {
                // Bower fonts
                cwd: '<%= scaffold.bowerDir %>bootstrap/dist/',
                src : ['fonts/*.*'],
                dest: '<%= scaffold.sourceDir %>asset/',
                expand: true
            },
            tmp: {
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

            dist: {
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
        },

        connect: {
            options: {
                hostname: 'localhost',
                port: 8080
            },
            dev: {
                options: {
                    base: '<%= scaffold.distDir %>',
                    open: true,
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        watch: {
            dev: {
                options: {
                    livereload: true,
                    spawn: false
                },
                files: [
                    '<%= scaffold.sourceDir %>index.html',
                    '<%= scaffold.distDir %>app/**/*.tpl.html',
                    '<%= scaffold.distDir %>css/*.css',
                    '<%= scaffold.distDir %>**/*.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'build'
                ]
            }
        }
    });

    grunt.registerTask('default', ['server']);

    // Task registration
    grunt.registerTask('prepare', [
        'clean',
        'copy:fonts',
        'useminPrepare',
        'copy:tmp',
        'clean:fonts',
        'concat'
    ]);

    // Task registration
    grunt.registerTask('build', [
        'prepare',
        'ngmin',
        'uglify',
        'cssmin',
        'usemin',
        'copy:dist'
    ]);

    // Task registration
    grunt.registerTask('server', [
        'build',
        'connect',
        'watch'
        // @todo run test tasks
    ]);

    // Task registration
    grunt.registerTask('release', [
        'build',
        'clean:tmp'
        // @todo run test tasks
    ]);
};
