const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

fs.readdirSync(__dirname + '/../middlewares').forEach((file) => {
    let middleware = file.substr(0, file.indexOf('.'));
    require('../middlewares/' + middleware)(app);
});

fs.readdirSync(__dirname + '/../routes').forEach((file) => {
    let route = file.substr(0, file.indexOf('.'));
    require('../routes/' + route)(app);
});

module.exports = {
    app: app,
};