const { Op } = require('sequelize');
const { Product, Stock } = require('../../models');

const condition = [
    {
        attributes: [['id', 'idStock'], 'quantity', 'price'],
        model: Stock,
        as: 'stock',
        required: true
    }
];

module.exports = {
    save: async (payload) => {
        return await Product.create(payload);
    },

    getById: async (id) => {
        return await Product.findByPk(id);
    },

    getOne: async (where) => {
        return await Product.findOne({ where, include: condition });
    },

    getBy: async (where) => {
        return await Product.findAll({ where, include: condition });
    },

    getAll: async () => {
        return await Product.findAll({ include: condition });
    },
    getAllBy: async (payload = {}) => {
        let filter = {};
        if (typeof payload.ids !== 'undefined') {
            filter.id = { [Op.in]: payload.ids };
        }

        const products = await Product.findAll({
            where: filter,
            include: condition,
            raw: true,
            nest: true
        });
        return products;
    },
    update: async (payload, id) => {
        return await Product.update(payload, { where: { id } });
    },
    remove: async (id) => {
        return await Product.destroy({ where: { id } });
    },
    removeBy: async (where) => {
        return await Product.destroy({ where: where });
    }
};
