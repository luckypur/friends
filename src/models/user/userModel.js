const Sequelize = require('sequelize');

var User = {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
};

module.exports = User;
