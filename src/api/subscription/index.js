const Router = require('koa-router');
const subscriptionCtrl = require('./subscription.ctrl');

const subscription = new Router();

subscription.post('/', subscriptionCtrl.create);
subscription.get('/', subscriptionCtrl.list);

module.exports = subscription;