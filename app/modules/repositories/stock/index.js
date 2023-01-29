const { Op } = require('sequelize');
const { Stock, Product } = require('../../models');

const condition = {
    attributes: [['id', 'idProduct'], 'name', 'status'],
    model: Product,
    as: 'product',
    required: true
};

module.exports = {
    save: async (payload) => {
        return await Stock.create(payload);
    },

    getById: async (id) => {
        return await Stock.findByPk(id, { raw: true, nest: true });
    },
    getOneBy: async (where) => {
        return await Stock.findOne({ where, include: condition });
    },

    getAll: async () => {
        return await Stock.findAll({
            include: condition
        });
    },
    update: async (payload, id) => {
        return await Stock.update(payload, { where: { id } });
    },

    //better to have not remove
    remove: async (id) => {
        return await Stock.destroy({ where: { id } });
    },

    removeBy: async (where) => {
        return await Stock.destroy({ where: where });
    }
    //
};
