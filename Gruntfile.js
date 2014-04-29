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

        meta: {
            banner:
                '/**\n' +
                    ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' *\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                    ' * Released under the <%= pkg.licenses[0].type %> license\n' +
                    ' * <%= pkg.licenses[0].url %>\n' +
                    ' *\n' +
                    ' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' */\n'
        },

        // Project paths
        scaffold: {
            sourceDir: 'src/',
            testDir: 'test/',
            bowerDir: 'bower_components/',
            buildRoot: 'build/',
            tmpDir: 'build/.tmp/',
            assetDir: 'build/.tmp/asset/',
            concatDir: 'build/.tmp/concat/',
            htmlDir: 'build/.tmp/html/',
            distDir: 'build/dist/'
        },

        clean: {
            tmp: ['<%= scaffold.tmpDir %>'],
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

        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                mangle: true,
                compress: true,
                sourceMap: true,
                sourceMapIncludeSources: true
            }
        },

        cssmin: {
            options: {
                banner: '<%= meta.banner %>',
                keepSpecialComments: 0
            }
        },

        html2js: {
            app: {
                options: {
                    module: 'template.app',
                    useStrict: true,
                    quoteChar: '\'',
                    indentString: '    ',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['<%= scaffold.sourceDir %>app/**/*.tpl.html'],
                dest: '<%= scaffold.sourceDir %>app/module/template/template.js'
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
                    // Assets (fonts, img, ico)
                    cwd: '<%= scaffold.sourceDir %>',
                    src : ['asset/**/*.*'],
                    dest: '<%= scaffold.tmpDir %>',
                    expand: true
                }]
            },

            dist: {
                files: [{
                    // HTML index
                    cwd: '<%= scaffold.htmlDir %>',
                    src : ['index.html'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }, {
                    // Fonts and images
                    cwd: '<%= scaffold.assetDir %>',
                    src : ['**'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }]
            },

            unmin: {
                files: [{
                    cwd: '<%= scaffold.concatDir %>',
                    src : ['**'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    '<%= scaffold.concatDir %>**/vendor.js'
                ]
            },
            standard: [
                '<%= scaffold.sourceDir %>**/*.js',
                '<%= scaffold.testDir %>**/*.spec.js',
                '<%= scaffold.testDir %>**/*.scenario.js',
                '<%= scaffold.testDir %>**/*.conf.js',
                'Gruntfile.js'
            ]
        },

        karma: {
            standard: {
                configFile: 'test/config/karma.unit.conf.js',
                browsers: ['PhantomJS']
            },
            allBrowsers: {
                configFile: 'test/config/karma.unit.conf.js'
            },
            coverage: {
                configFile: 'test/config/karma.unit.conf.js',
                reporters: [
                    'coverage'
                ],
                preprocessors: {
                    'src/**/*.js': ['coverage']
                },
                coverageReporter: {
                    type : 'html',
                    dir : 'test/coverage/'
                }
            }
        },

        plato: {
            dev: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc')
                },
                files: {
                    'reports': [
                        'src/**/*.js',
                        'test/unit/**/*.js',
                        'test/e2e/**/*.js'
                    ]
                }
            }
        },

        connect: {
            options: {
                hostname: 'localhost',
                port: 8080
            },
            standard: {
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
            standard: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= scaffold.sourceDir %>index.html',
                    '<%= scaffold.sourceDir %>app/**/*.tpl.html',
                    '<%= scaffold.sourceDir %>app/**/*.js',
                    '<%= scaffold.sourceDir %>css/*.css',
                    '<%= scaffold.testDir %>**/*.spec.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'build',
                    'jshint',
                    'karma:standard'
                ]
            },
            dev: {
                files: [
                    '<%= scaffold.sourceDir %>index.html',
                    '<%= scaffold.sourceDir %>app/**/*.tpl.html',
                    '<%= scaffold.sourceDir %>app/**/*.js',
                    '<%= scaffold.sourceDir %>css/*.css',
                    '<%= scaffold.testDir %>**/*.spec.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'build',
                    'karma:allBrowsers'
                ]
            }
        }
    });

    // Task registration
    grunt.registerTask('default', ['server']);

    grunt.registerTask('prepare', [
        'clean',
        'copy:fonts',
        'html2js',
        'useminPrepare',
        'copy:tmp',
        'concat'
    ]);

    grunt.registerTask('build', [
        'prepare',
        'usemin',
        'copy:dist',
        'copy:unmin',
        'clean:fonts'
    ]);

    grunt.registerTask('test', [
        'build',
        'karma:allBrowsers',
        'watch:dev'
    ]);

    grunt.registerTask('coverage', [
        'build',
        'karma:coverage'
    ]);

    grunt.registerTask('report', [
        'plato'
    ]);

    grunt.registerTask('server', [
        'build',
        'jshint',
        'karma:standard',
        'connect',
        'watch:standard'
    ]);

    grunt.registerTask('release', [
        'prepare',
        'ngmin',
        'uglify',
        'cssmin',
        'usemin',
        'copy:dist',
        'clean:fonts',
        'jshint',
        'karma:allBrowsers',
        'clean:tmp'
    ]);
};
