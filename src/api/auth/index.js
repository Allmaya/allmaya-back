const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.delete('/withdrawal', authCtrl.withdrawal);

module.exports = auth;