let express = require('express'),
    config = require('./config'),
    middleware = require('./middleware'),
    routes = require('./routes');

let app = express();

middleware.init(app);

apiRouter = routes.init(app);

// Error Handler
app.use(function (err, req, res, next) {
    console.log('In Error Handler!');
    if (err) {
        if (err.statusCode)
            res.status(err.statusCode).json({message: err.message, error: err});
        else
            res.status(req.appStatus || 500).json({message: err.message, error: err});
        return;
    }
    next();
    return;
});

// No Endpoint Handler
app.all('*', function (req, res) {
    console.log('No Endpoint!');
    if (!res.headersSent) {
        res.status(404).json('Uh Oh');
    }
    return;
});

module.exports = app;
