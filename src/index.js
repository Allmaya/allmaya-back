require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

require('dotenv').config();
const app = new Koa();
const router = new Router();
const mongoose = require('mongoose');
const { jwtMiddleware } = require('./lib/jwtMiddleware');

const { PORT, MONGO_URI } = process.env;

const mongo_uri = MONGO_URI || "mongodb://localhost:27017/blog"

mongoose
    .connect(mongo_uri, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.log(e);
    });

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 8000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
})