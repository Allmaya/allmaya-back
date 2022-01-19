const Router = require('koa-router');
const dataCtrl = require('./data.ctrl');

const data = new Router();

data.post('/create', dataCtrl.create);

module.exports = data;