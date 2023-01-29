'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transaction', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idUser: {
                type: Sequelize.INTEGER,
            },
            invoice: {
                type: Sequelize.STRING,
            },
            details: {
                type: Sequelize.JSON
            },
            total: {
                type: Sequelize.DECIMAL(10,2),
                default: 0.00
            },
            amountPaid: {
                type: Sequelize.DECIMAL(10,2),
            },
            status: {
                type: Sequelize.ENUM,
                values: ['pending', 'failed', 'cancelled', 'done']
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
        await queryInterface.dropTable('transaction');
    },
};
