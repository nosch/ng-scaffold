// Karma configuration: e2e Tests
// Generated on Mon Aug 19 2013 10:31:57 GMT+0200 (CEST)

module.exports = function (config) {
    'use strict';

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../..',

        // frameworks to use
        frameworks: [
            'ng-scenario'
        ],

        // list of files / patterns to load in the browser
        files: [
            'test/e2e/*.scenario.js'
        ],

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: [
            'progress'
        ],

        // web server port
        port: 9876,

        // hostname to be used when capturing browsers
        // default: 'localhost'
        hostname: 'localhost',

        // base url, where Karma runs.
        urlRoot: '/_e2e-tests_/',

        // map of path-proxy pairs
        proxies: {
            '/': 'http://localhost:8080/'
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // list of log appenders to be used
        loggers: [
            {type: 'console'}
        ],

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome',
            'Firefox'
        ],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
