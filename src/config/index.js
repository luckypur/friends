var _ = require('lodash');
db = require('./database');

var config = {
    dev: 'dev',
    port: process.env.PORT || 3000,
    defaultPageSize: 5
};


process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;

envConfig = require('./' + config.env);
envConfig = envConfig || {};

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig);
