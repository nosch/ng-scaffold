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

   /**
    * Register custom tasks.
    */
    // Create build
    grunt.registerTask('build', [
        'clean:dist',
        'clean:release',
        'copy:build',
        'modernizr',
        'concat',
        'recess',
        'uglify'
    ]);

    // Development build
    // with linting,
    // but no tests
    grunt.registerTask('dev', [
        'jshint:dev',
        'plato:dev',
        'build',
        'jshint:afterconcat'
    ]);

    // Run and autowatch development build
    // on lokal serverlivereload
    // (linting included, no tests)
    grunt.registerTask('dev-server', [
        'dev',
        'connect:dev',
        'watch:dev'
    ]);

    // Run and autowatch unit tests
    // on development build
    // with Karma
    // (linting included)
    grunt.registerTask('dev-test', [
        'dev',
        'watch:test'
    ]);

    // Release build
    // with linting and
    // running all tests
    grunt.registerTask('release', 'Release build', function () {
        grunt.task.run(
            'jshint:release',
            'build',
            'karma:unit',
            'jshint:afterconcat',
            'clean:unmin',
            'copy:release',
            'clean:dist',
            'connect:testRelease',
            'karma:e2e'
        );

        // set suffix for minified files to '.min'
        grunt.config.set('meta.minSuffix', '.min');
    });

    // Start and open release server
    // (no build, no linting, no tests)
    grunt.registerTask('release-server', [
        'connect:release'
    ]);

    // Run unit and e2e tests
    // on build
    // with Karma
    // (no linting, no autowatch)
    grunt.registerTask('test', [
        'build',
        'karma:unit',
        'connect:testDev',
        'karma:e2e'
    ]);

   /**
    * Configure tasks.
    */
    grunt.initConfig({
        // get npm config
        pkg: grunt.file.readJSON('package.json'),

        // define meta data
        meta: {
            // This is a file suffix for minified sources like jquery.min.js;
            // the default value is an empty string;
            // this suffix is set to '.min' inside the release task;
            // it's used as a template variable inside index.html;
            // based on this variable the minified sources for the release task,
            // or the unminified files for the build and development tasks are loaded.
            //
            minSuffix: '',
            // doc block for the concatinated and compiled files
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
                ' */\n',

            // strict mode string
            strict: '\'use strict\';\n\n'
        },

        /**
         * dev + release tasks: jshint, palato, karma
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['dist/lib/*', 'dist/src/**/*.min.js']
            },
            dev: [
                'src/**/*.js',
                'test/**/*.spec.js',
                'test/**/*.scenario.js',
                'test/**/*.conf.js',
                'Gruntfile.js'
            ],
            release: [
                'src/**/*.js'
            ],
            afterconcat: [
                'dist/src/**/*.js'
            ]
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

        karma: {
            unit: {
                configFile: 'test/config/karma.unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            e2e: {
                configFile: 'test/config/karma.e2e.conf.js',
                autoWatch: false,
                singleRun: true
            },
            dev: {
                configFile: 'test/config/karma.unit.conf.js',
                browsers: ['PhantomJS'], // Only PhantomJS!
                autoWatch: false,
                singleRun: true
            },
            watch: {
                configFile: 'test/config/karma.unit.conf.js',
                browsers: ['PhantomJS'], // Only PhantomJS!
                autoWatch: true,
                singleRun: false
            }
        },

        /**
         * dev tasks: watch, connect, open
         */
        watch: {
            dev: {
                options: {
                    livereload: true,
                    spawn: false
                },
                files: [
                    'src/index.html',
                    'src/app/**/*.tpl.html',
                    'src/common/**/*.tpl.html',
                    'src/less/*.less',
                    'src/**/*.js',
                    'Gruntfile.js',
                    'bower.json'
                ],
                tasks: [
                    'dev'
                ]
            },
            test: {
                options: {
                    spawn: false
                },
                files: [
                    'src/**/*.js',
                    'test/**/*.spec.js',
                    'test/**/*unit.conf.js'
                ],
                tasks: [
                    'dev',
                    'karma:dev'
                ]
            }
        },

        connect: {
            options: {
                hostname: 'localhost',
                port: 8080
            },
            dev: {
                options: {
                    base: 'dist/',
                    open: true,
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            },
            release: {
                options: {
                    base: 'release/',
                    keepalive: true,
                    open: true,
                    middleware: function (connect, options) {
                        return [
                            connect.static(options.base)
                        ];
                    }
                }
            },
            testDev: {
                options: {
                    base: 'dist/',
                    middleware: function (connect, options) {
                        return [
                            connect.static(options.base)
                        ];
                    }
                }
            },
            testRelease: {
                options: {
                    base: 'release/',
                    middleware: function (connect, options) {
                        return [
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost:8888/'
            },
            release: {
                path: 'http://localhost:8080/'
            }
        },

        /**
         * build tasks: clean, copy, modernizr, concat, recess, uglify
         */
        clean: {
            // delete dist folder
            dist: ['dist'],
            // delete release folder
            release: ['release'],
            // delete all unminified sources from dist/
            unmin: [
                'dist/src/app.js',
                'dist/lib/angular.js',
                'dist/lib/angular-route.js',
                'dist/lib/bootstrap.js',
                'dist/lib/jquery.js',
                'dist/lib/modernizr.js'
            ]
        },

        copy: {
            build: {
                files: [{
                    // copy index.html, robots.txt, license.txt
                    cwd: 'src',
                    src : ['*.txt'],
                    dest: 'dist',
                    expand: true
                }, {
                    // copy angular templates
                    src: [
                        'src/app/**/*.tpl.html',
                        'src/common/**/*.tpl.html'
                    ],
                    dest: 'dist/src/tpl/',
                    expand: true,
                    flatten: true
                }, {
                    // copy content of asset dir
                    cwd: 'src/asset',
                    src : '**',
                    dest: 'dist',
                    expand: true
                }, {
                    // copy vendor: Bootstrap (fonts)
                    cwd: 'vendor/bootstrap/dist/fonts',
                    src : ['*'],
                    dest: 'dist/fonts',
                    expand: true
                }, {
                    // copy vendor: Bootstrap (css)
                    cwd: 'vendor/bootstrap/dist/css',
                    src : ['bootstrap.css', 'bootstrap.min.css'],
                    dest: 'dist/css',
                    expand: true
                }, {
                    // copy vendor: Bootstrap (js)
                    cwd: 'vendor/bootstrap/dist/js',
                    src : ['*.js'],
                    dest: 'dist/lib',
                    expand: true
                }, {
                    // copy vendor: Angular
                    cwd: 'vendor/angular/',
                    src : ['angular.js', 'angular.min.js'],
                    dest: 'dist/lib',
                    expand: true
                }, {
                    // copy vendor: Angular-Route
                    cwd: 'vendor/angular-route/',
                    src : ['angular-route.js', 'angular-route.min.js'],
                    dest: 'dist/lib',
                    expand: true
                }, {
                    // copy vendor: jQuery
                    cwd: 'vendor/jquery/',
                    src : ['jquery.js', 'jquery.min.js'],
                    dest: 'dist/lib',
                    expand: true
                }, {
                    // copy vendor: Modernizr
                    src: 'vendor/modernizr/index.js',
                    dest: 'dist/lib/modernizr.js'
                }]
            },
            release: {
                files: [{
                    // copy contents of dist/ to release
                    cwd: 'dist',
                    src : ['**'],
                    dest: 'release',
                    expand: true
                }]
            }
        },

        modernizr: {
            // generate a uglified version of modernizr.js
            'devFile' : 'vendor/modernizr/index.js',
            'outputFile' : 'dist/lib/modernizr.min.js',
            'uglify' : true,
            'tests' : [],
            'parseFiles' : false,
            'matchCommunityTests' : false,
            'customTests' : [],
            // based on default settings on http://modernizr.com/download/
            'extra' : {
                'cssclasses' : true,
                'shiv' : true,
                'printshiv' : true,
                'load' : false,
                'mq' : false
            },
            // based on default settings on http://modernizr.com/download/
            'extensibility' : {
                'addtest' : false,
                'prefixed' : false,
                'teststyles' : false,
                'testprops' : false,
                'testallprops' : false,
                'hasevents' : false,
                'prefixes' : false,
                'domprefixes' : false
            }
        },

        concat: {
            // concat all src/app js files and compiled templates
            index: {
                options: {
                    process: true
                },
                files: {
                    'dist/index.html': ['src/index.html']
                }
            },
            build: {
                options: {
                    nonull: true,
                    separator: '\n\n',
                    stripBanners: true,
                    // add doc block (banner) and 'use strict' statement
                    banner: '<%= meta.banner %>' + '<%= meta.strict %>',
                    // replace all 'use strict' statements
                    process: function (src) {
                        return  src.replace(
                            /(^|\n)([ \t]*)('use strict'|"use strict");?\s*/g,
                            '$1$2'
                        );
                    }
                },
                files: {
                    'dist/src/app.js': ['src/**/*.js']
                }
            }
        },

        recess: {
            options: {
                noIDs: false,
                noJSPrefix: false,
                noOverqualifying: false
            },
            compile: {
                // lint and compile less files
                files: {
                    'dist/css/app.css': ['src/less/*.less']
                },
                options: {
                    compile: true
                }
            },
            compress: {
                // lint, compile and compress less files
                files: {
                    'dist/css/app.min.css': ['dist/css/app.css']
                },
                options: {
                    compress: true
                }
            }
        },

        uglify: {
            options: {
                mangle: true,
                report: 'min',
                wrap: 'global',
                exportAll: true,
                compress: {
                    dead_code: false,
                    unused: false
                }
            },
            // app.js
            app: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    'dist/src/app.min.js': ['dist/src/app.js']
                }
            }
        }
    });
};
