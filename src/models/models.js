'use strict';

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let db = {};
let envConfig = require('../config');

/**
 * one of the problem with sequelize
 * can not think of any other way to access the db instance
 * app wise
 * @type {Sequelize}
 */


let sequelize = require('../config/database')(envConfig.dbName, envConfig.dbHost, envConfig.dbUser, envConfig.dbPassword);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file.slice(-3) !== '.js'
    })
    .filter(modelDir => {

        fs
            .readdirSync(path.join(__dirname, modelDir))
            .filter(file => {
                return file.endsWith('Schema.js')
            }).forEach(file => {
            let model = sequelize['import'](path.join(__dirname, modelDir, file));
            db[model.name] = model;
            return file
        });
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate)
        db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
