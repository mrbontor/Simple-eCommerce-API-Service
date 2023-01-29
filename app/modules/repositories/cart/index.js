const Redis = require('../../../libraries/redis');

const KEY = process.env.APP_CART_KEY || 'cart';

module.exports = {
    save: async (idUser, payload) => {
        const add = await Redis.hset(KEY, idUser, JSON.stringify(payload));
        return add === 1 ? true : false;
    },
    get: async (idUser) => {
        const get = await Redis.hget(KEY, idUser.toString());
        if (get) {
            return JSON.parse(get);
        }
    },

    getAll: async () => {
        const get = await Redis.hgetall(KEY);
        if (get) {
            return JSON.parse(get);
        }
    },

    remove: async (idUser) => {
        return await Redis.hdel(KEY, idUser.toString());
    }
};
