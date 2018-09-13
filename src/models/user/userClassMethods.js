var notFoundError = require('../../helpers').notFoundError;

/**
 * Add any class methods here
 */


/**
 * create two relationship here
 * will better while retrieving records
 * */
function makeFriend(userId, friendId) {
    return this.findById(userId)
        .then(user => {
            if (!user)
                notFoundError('User');
            this.findById(friendId)
                .then(friend => {
                    if (!friend)
                        notFoundError('User');
                    user.addFriend(friend);
                    friend.addFriend(user);
                })
        })
}

function addMethods(User) {
    User.makeFriend = makeFriend;
}

module.exports = addMethods;
