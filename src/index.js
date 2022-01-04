require('dotenv').config();
const Koa = require('koa');

const app = new Koa();

const { PORT } = process.env;

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
})