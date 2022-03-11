const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const user = new Router();

user.get('/', userCtrl.list);

module.exports = user;