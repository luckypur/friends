let fs = require('fs');
let config = require('../config');

// requires all files/modules in a directory
function reqDir(dir) {
    // Grab the name of the directory to not include it's main file
    let dirName = dir.split('/');
    dirName = dirName[dirName.length - 1] + '.js';
    let reqObj = {};
    let files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        // Don't include the index or directory's main file
        if (file !== dirName && file !== 'index.js') {
            reqObj[file] = require(dir + '/' + file);
        }
    }
    return reqObj;
}


function success(res, message) {
    return function (data) {
        console.log('SUCCESS!');
        let response = {};
        if (message) {
            response = {
                message: message,
                data: data
            };
        } else {
            response = data;
        }
        return res.json(response);
    }
}

function failure(req, next, status) {
    return function (err) {
        console.log('FAILURE!', err)
        if (err.statusCode) {
            req.appStatus = err.statusCode;
        } else {
            req.appStatus = status;
        }
        next(err);
        return;
    }
}


function methodNotAllowed(req, res, next) {
    res.status(405);
    res.json({
        'error': 'Method Not Allowed'
    });
    next();
}


function notFoundError(model) {
    let e = new Error('Could not find ' + model);
    e.statusCode = 404;
    throw e;
}

function getPaginationOption(req) {
    let count = +req.query.count || config.defaultPageSize,
        offset = +req.query.offset || 0;

    // account for offset and count
    offset += req.query.page * count || 0;
    if (count > 1000) count = 100;
    if (count < 0) count = config.defaultPageSize;

    return {
        offset: offset,
        limit: count
    }

}


module.exports = {
    failure: failure,
    success: success,
    require: reqDir,
    notFoundError: notFoundError,
    methodNotAllowed: methodNotAllowed,
    getPaginationOption: getPaginationOption
};

