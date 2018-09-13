/**
 * Add any instance method here
 */

function friendsOfFriends() {
    // sequelize dosent support union
    // its better to keep complex query clean
    return this.sequelize.query('SELECT Users.*, f_fof.UserId from Users,' +
        ' (SELECT f.UserId, f.FriendId FROM UserFriend f WHERE  UserId = ' + this.id + ' UNION' +
        '  SELECT f.UserId, fof.FriendId FROM UserFriend f, UserFriend fof' +
        '  WHERE  f.UserId = ' + this.id + '  AND   f.FriendId = fof.UserId )' +
        '  as f_fof WHERE Users.id = f_fof.FriendId',
        {type: this.sequelize.QueryTypes.SELECT}).then(function (res) {
        return res;
    })
}

function addMethods(schema) {
    schema.prototype.friendsOfFriends = friendsOfFriends;
}

module.exports = addMethods;
