let Router = require('express').Router(),
    helpers = require('../helpers'),
    routes = helpers.require(__dirname);

Router.mountPath = '/api';

function init(app) {
    app.use(Router.mountPath, Router);
    return Router;
}

// Attach Routes to Router instance
for (let route in routes)
    if (routes.hasOwnProperty(route)) {
        let element = routes[route];
        element.init(Router);
    }


module.exports.init = init;
