const { Op } = require('sequelize');
const { Transaction, User } = require('../../models');

const condition = {
    attributes: ['username'],
    model: User,
    as: 'user'
    // required: true,
};

module.exports = {
    save: async (payload) => {
        return await Transaction.create(payload);
    },

    getById: async (id) => {
        return await Transaction.findByPk(id);
    },
    getOneBy: async (where) => {
        return await Transaction.findOne({ where, include: condition });
    },

    getAllUserTransaction: async (idUser) => {
        return await Transaction.findAll({ where: { idUser } });
    },

    getAll: async () => {
        return await Transaction.findAll({
            include: condition
        });
    },
    update: async (payload, id) => {
        return await Transaction.update(payload, { where: { id } });
    },

    remove: async ({ id }) => {
        return await Transaction.destroy({ where: id });
    }
};
