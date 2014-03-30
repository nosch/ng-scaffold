// Protractor configuration e2e tests
exports.config = {

    capabilities: {
        'browserName': 'chrome'
    },

    specs: [
        '../../test/e2e/**/*.spec.js'
    ],

    suites: {
        home: '../../test/e2e/home/**/*.js',
        contact: '../../test/e2e/contact/**/*.js'
    },

    framework: 'jasmine',

    jasmineNodeOpts: {
        isVerbose: true,
        includeStackTrace: true,
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    baseUrl: 'http://localhost:8080'
};
