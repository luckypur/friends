let config = require('./dev');

module.exports = {
    'dev': {
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'mysql'
    }
};
