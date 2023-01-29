'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stock', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idProduct: {
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            price: {
                type: Sequelize.DECIMAL,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("stock");
    },
};
