'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../configs/mysql.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(
        process.env[config.use_env_variable],
        Object.assign({}, config, {
            dialect: 'mysql',
            pool: {
                max: 5,
                idle: 30000,
                acquire: 60000
            }
        })
    );
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Product = require(path.join(__dirname, '/product'))(sequelize, Sequelize.DataTypes);
db.Stock = require(path.join(__dirname, '/stock'))(sequelize, Sequelize.DataTypes);
db.Transaction = require(path.join(__dirname, '/transaction'))(sequelize, Sequelize.DataTypes);
db.User = require(path.join(__dirname, '/user'))(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
module.exports = db;
