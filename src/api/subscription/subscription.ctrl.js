const responseUtils = require("../../lib/response");
const STATUS = require("../../lib/status");

const create = async (ctx) => {
    const { loginuser } = ctx.state;
    if (!loginuser) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNAUTHORIZED, 'need authorization.');
        return;
    }

    // const schema = Joi.object().keys({
    //     currency: Joi.
    //     amount: Joi.string().required()
    // });

    // const result = schema.validate(ctx.request.body);
    // if (result.error) {
    //     responseUtils.setBasicResponse(ctx, STATUS.STATUS_BAD_REQUEST, result.error);
    //     return;
    // }

    try {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_OK, 'success to create subscription item.');
        const { name, period, date, currency, price } = ctx.request.body;
        ctx.body.name = name;
        ctx.body.period = period;
        ctx.body.date = date;
        ctx.body.currency = currency;
        ctx.body.price = price;
    } catch (e) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNKNOWN, `fail to create subscrition item. :: ${e}`);
    }
};

const list = async (ctx) => {
    const { loginuser } = ctx.state;
    if (!loginuser) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNAUTHORIZED, 'need authorization.');
        return;
    }

    // const schema = Joi.object().keys({
    //     currency: Joi.
    //     amount: Joi.string().required()
    // });

    // const result = schema.validate(ctx.request.body);
    // if (result.error) {
    //     responseUtils.setBasicResponse(ctx, STATUS.STATUS_BAD_REQUEST, result.error);
    //     return;
    // }

    try {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_OK, 'success to create subscription item.');
        const { name, period, date, currency, price } = ctx.request.body;
        ctx.body.data = [
            {
                "name": "Youtube Premium",
                "period": "1m",
                "date": "2022-03-23",
                "currency": "0",
                "price": "10000"
            },
            {
                "name": "netflix",
                "period": "3m",
                "date": "2022-03-23",
                "currency": "1",
                "price": "98"
            },
            {
                "name": "allmaya",
                "period": "1y",
                "date": "2022-03-23",
                "currency": "0",
                "price": "20000"
            },
        ];
    } catch (e) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNKNOWN, `fail to get subscrition list. :: ${e}`);
    }
};

module.exports = { create, list };