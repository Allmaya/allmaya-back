const Router = require('koa-router');
const auth = require('./auth');
const user = require('./user');
const subscription = require('./subscription');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/subscription', subscription.routes());

module.exports = api;