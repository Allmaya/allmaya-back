const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const user = new Router();

user.post('/:id', userCtrl.test);

module.exports = user;