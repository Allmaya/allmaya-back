require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const { PORT } = process.env;

app.use(bodyParser());

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
})