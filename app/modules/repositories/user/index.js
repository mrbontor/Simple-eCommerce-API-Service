const { Op } = require('sequelize');
const { User } = require('../../models');

const publicFields = { attributes: ['id', 'username', 'email', 'isActive', 'isAdmin'] };

module.exports = {
    save: async (payload) => {
        return await User.create(payload);
    },

    getById: async (id) => {
        return await User.findByPk(id);
    },

    getOne: async (where, options = {}) => {
        return await User.findOne({ where, ...options });
    },

    getBy: async (where) => {
        return await User.findAll(where);
    },

    getAll: async () => {
        return await User.findAll(publicFields);
    },

    update: async (payload, id) => {
        return await User.update(payload, { where: { id } });
    },

    updateBy: async (payload, clause) => {
        return await User.update(payload, { where: clause });
    },
    remove: async (id) => {
        return await User.destroy({ where: { id } });
    }
};
