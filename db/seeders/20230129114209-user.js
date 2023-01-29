'use strict';
const {Op} = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize) {

        //Password is Haruslolos123!

        await queryInterface.bulkInsert(
            'user',
            [
                {
                    username: 'zeus',
                    email: 'zeus@gmail.com',
                    infoLogin: {"hash": "738e81b150b75daa7e5f35749f034e43ebad5fbcb41bd4a6de7109c70112ef3bc15322f7d63d04546d7fe9aa5ec2f94c4e22c5236864e3b9edc8793dc84ab812", "salt": "d81hKdcGY572Z6u5X40yzOPNjg2X4TZAVW8NrZx+ZpwuMAQROcTsxWuEYFjY7VQzjNTS3sl1/s7HM8r01Qwl93s/Pwgz4DaRj2YJY6CdZizpLwKs+am2G+TQ6dT/cvMKltCszfNqfYRzWnPe7ajGSbDbNlLzNxHPACrWBIU96cw=", "iterations": 2905},
                    isAdmin: true,
                    isActive: true,
                    token: '[]',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    username: 'locky',
                    email: 'locky@gmail.com',
                    infoLogin: {"hash": "738e81b150b75daa7e5f35749f034e43ebad5fbcb41bd4a6de7109c70112ef3bc15322f7d63d04546d7fe9aa5ec2f94c4e22c5236864e3b9edc8793dc84ab812", "salt": "d81hKdcGY572Z6u5X40yzOPNjg2X4TZAVW8NrZx+ZpwuMAQROcTsxWuEYFjY7VQzjNTS3sl1/s7HM8r01Qwl93s/Pwgz4DaRj2YJY6CdZizpLwKs+am2G+TQ6dT/cvMKltCszfNqfYRzWnPe7ajGSbDbNlLzNxHPACrWBIU96cw=", "iterations": 2905},
                    isAdmin: false,
                    isActive: true,
                    token: '[]',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user', { [Op.or]: [{ username: 'superadmin' }, { username: 'user' }] });
    }
};
