'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {firstName: 'John', lastName: 'Doe', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'shon', lastName: 'foe', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'loan', lastName: 'soe', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'chon', lastName: 'coe', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'khon', lastName: 'eoe', createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
