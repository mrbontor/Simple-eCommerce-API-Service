const Express = require('express');
const App = Express();

const ENV = process.env.NODE_ENV || 'development';

const Logging = require('./helpers/logging');

// Initialize config file
require('dotenv').config();

process.env.TZ = 'Asia/Jakarta';

// Initialize logging
Logging.init({
    path: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL,
    type: process.env.LOG_TYPE, //Logging or write to file
    filename: process.env.LOG_FILENAME
});

//Initialize mysql connection
const DbCon = require('../app/modules/models');
DbCon.sequelize
    .sync()
    .then(() => {
        Logging.info('[MYSQL] database connected ');
    })
    .catch((err) => {
        Logging.error('[MYSQL] connection database failed...' + err.message);
    });

//Initialize redis connection
const confRedis = {
    // host: process.env.REDIS_HOSTNAME,
    // port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD
    url: `redis://${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}/`,
    checkpoint: 'redis-key',
    // startTime: 'redis-key-startTime',
    // lock: 'redis-key-lock',
    // disableOfflineQueue: true,
};
const Redis = require('./libraries/redis');
Redis.init(confRedis);
// Redis.auth(process.env.REDIS_PASSWORD);
Redis.connect();

const redisHealth = async () => {
    try {
        const redisHealth = await Redis.ping();
        if ('PONG' === redisHealth) Logging.info('[REDIS] Connection established');
    } catch (err) {
        Logging.error('[REDIS] connection failed...' + err);
    }
};
redisHealth();

//Sercice check healt
App.get('/', (req, res, next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});

const Router = require('./api');
App.use('/api', Router);

module.exports = App;
