let logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');


module.exports.init = function (app) {
    console.log('Middleware initiated');
    // allow cross origin resource sharing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(logger('dev'));
    app.use(cookieParser());
};
