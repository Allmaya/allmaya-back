const Router = require('koa-router');
const auth = require('./auth');
const user = require('./user');
const data = require('./data');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/data', data.routes());

module.exports = api;