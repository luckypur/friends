var config = require('./src/config');
var app = require('./src/app');

app.listen(config.port, function () {
    console.log('Express ' + config.env + '\ ' +
        'server listening on port ' + config.port);
});
