'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('UserFriend', [
            {id: 1, userId: 1, friendId: 4, createdAt: new Date(), updatedAt: new Date() },
            {id: 2, userId: 2, friendId: 3, createdAt: new Date(), updatedAt: new Date()},
            {id: 3, userId: 3, friendId: 2, createdAt: new Date(), updatedAt: new Date()},
            {id: 4, userId: 4, friendId: 1, createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('UserFriend', null, {});
    }
};
