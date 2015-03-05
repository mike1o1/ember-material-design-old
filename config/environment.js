/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'ember-material-design',
        environment: environment,
        baseURL: '/ember-material-design',
        locationType: 'hash',
        //sassOptions: {
        //    sourceMapEmbed: true
        //},
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        contentSecurityPolicy: {
            'img-src': "'self' data: * https://placehold.it",
            'font-src': "'self' https://fonts.gstatic.com",
            'style-src': "'self' https://fonts.googleapis.com 'unsafe-inline'"
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
