require('dotenv').config();
const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_DATABASE, DB_DIALECT } = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOSTNAME,
        dialect: DB_DIALECT,
        reconnect: true,
        synchronize: true,
        logging: false,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
