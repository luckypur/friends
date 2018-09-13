'use strict';
// DEPENDENCIES
let Helpers = require('../helpers'),
    models = require('../models'),
    success = Helpers.success,
    failure = Helpers.failure,
    methodNotAllowed = Helpers.methodNotAllowed,
    getPaginationOption = Helpers.getPaginationOption,
    notFound = Helpers.notFoundError;

/**
 * Get all users
 */
function getUsers(req, res, next) {

    let pageOptions = getPaginationOption(req);
    // pageOptions.include = [];
    models.User
        .findAndCountAll(pageOptions)
        .then(success(res))
        .catch(failure(req, next));
}


/**
 * create a new user
 */
function postUsers(req, res, next) {
    let user = req.body;
    if (!user) throw 'No user!';
    models.User.create(user)
        .then(data => {
            res.status(201);
            success(res)(data);
        })
        .catch(failure(req, next));
}


/**
 * make a new friend for current user
 */
function makeFriend(req, res, next) {
    let friend = req.body;
    if (!friend.id) notFound('Friend');

    models.User.makeFriend(req.params.id, friend.id)
        .then(data => {
            res.status(201);
            success(res)(data);
        })
        .catch(failure(req, next));
}

/**
 * get data of a user
 */
function userDetails(req, res, next) {
    models.User.findById(req.params.id)
        .then(user => {
            if (!user)
                notFound('User');
            success(res)(user);
        })
        .catch(failure(req, next, 404));
}

/**
 * get all friends of a user
 */
function getFriends(req, res, next) {
    let pageOptions = getPaginationOption(req);
    models.User.findById(req.params.id)
        .then(user => {
            return user.getFriends(pageOptions);
        })
        .then(success(res))
        .catch(failure(req, next));
}


/**
 * get all friends of user's friends
 */
function getFriendsOfFriends(req, res, next) {
    models.User.findById(req.params.id)
        .then(user => {
            user.friendsOfFriends()
                .then(success(res))
                .catch(failure(req, next));
        })
        .catch(failure(req, next));
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
