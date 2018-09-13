module.exports = {
    up: (queryInterface, Sequelize) => {
        // Product belongsToMany Tag
        return queryInterface.createTable(
            'UserFriend',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                UserId: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                },
                FriendId: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                },
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        // remove table
        return queryInterface.dropTable('UserFriend');
    },
};
