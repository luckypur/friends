var notFoundError = require('../../helpers').notFoundError;

/**
 * Add any class methods here
 */


/**
 * create two relationship here
 * i am ur friend and u r mine(good for rdbms ;))
 * @param user_id
 * @param friend_id
 */
function makeFriend(user_id, friend_id) {
    return this.findById(user_id)
        .then(user => {
            if (!user)
                notFoundError('User');
            this.findById(friend_id)
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
