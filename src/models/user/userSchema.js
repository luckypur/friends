var userModel = require('./userModel'),
    userClassMethods = require('./userClassMethods'),
    userMethods = require('./userMethods');


module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', userModel);

    User.associate = function (models) {
        User.belongsToMany(models.User, {'as': 'Friends', through: 'UserFriend'})
    };

    userMethods(User);
    userClassMethods(User);
    return User;
};
