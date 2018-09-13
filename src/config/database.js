let Sequelize = require('sequelize');

let dialect = 'mysql';
/**
 * Set up db connections
 */
module.exports = function configSequelize(dbName, dbHost, userName, password) {

    return new Sequelize(dbName, userName, password, {
        host: dbHost,
        dialect: dialect,
        logging: false
    });
};
