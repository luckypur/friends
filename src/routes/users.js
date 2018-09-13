'use strict';
// DEPENDENCIES
let Helpers = require('../helpers'),
    models = require('../models'),
    Success = Helpers.success,
    Failure = Helpers.failure,
    methodNotAllowed = Helpers.methodNotAllowed,
    getPaginationOption = Helpers.getPaginationOption,
    NotFound = Helpers.notFoundError;

/**
 * Get all users
 */
function getUsers(req, res, next) {

    let page_options = getPaginationOption(req);
    models.User
        .findAndCountAll(page_options)
        .then(Success(res))
        .catch(Failure(req, next));
}


/**
 * create a new user
 */
function postUsers(req, res, next) {
    let user = req.body;
    if (!user) {
        throw 'No user!';
    }
    models.User.create(user)
        .then(Success(res))
        .catch(Failure(req, next));
}


/**
 * make a new friend for current user
 */
function makeFriend(req, res, next) {
    let friend = req.body;
    if (!friend.id) {
        NotFound('Friend');
    }

    models.User.makeFriend(req.params.id, friend.id)
        .then(Success(res))
        .catch(Failure(req, next));
}

/**
 * get data of a user
 */
function userDetails(req, res, next) {
    models.User.findById(req.params.id)
        .then(user => {
            if (!user)
                NotFound('User');
            Success(res)(user);
        })
        .catch(Failure(req, next, 404));
}

/**
 * get all friends of a user
 */
function getFriends(req, res, next) {
    models.User.findById(req.params.id)
        .then(user => {
            return user.getFriends();
        })
        .then(Success(res))
        .catch(Failure(req, next));
}


/**
 * get all friends of user's friends
 */
function getFriendsOfFriends(req, res, next) {
    models.User.findById(req.params.id)
        .then(user => {
            user.friendsOfFriends()
                .then(Success(res))
                .catch(Failure(req, next));
        })
        .catch(Failure(req, next));
}

/**
 * all routes for users
 * @param Router
 */
function init(Router) {
    let base = '/users';

    Router.route(base)
        .get(getUsers)
        .post(postUsers)
        .all(methodNotAllowed);

    Router.route(base + '/:id')
        .get(userDetails)
        .all(methodNotAllowed);

    Router.route(base + '/:id/friends')
        .get(getFriends)
        .post(makeFriend)
        .all(methodNotAllowed);


    Router.route(base + '/:id/friends-of-friends')
        .get(getFriendsOfFriends)
        .all(methodNotAllowed);

}

module.exports.init = init;
