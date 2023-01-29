'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'user',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                username: {
                    type: Sequelize.STRING,
                    unique: 'username',
                },
                email: {
                    type: Sequelize.STRING,
                    unique: 'email',
                },
                infoLogin: {
                    type: Sequelize.JSON,
                },
                isAdmin: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                isActive: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                    defaultValue: true,
                },
                token: {
                    allowNull: false,
                    type: Sequelize.JSON,
                    defaultValue: [],
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE(3),
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE(3),
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                },
            }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    },
};
