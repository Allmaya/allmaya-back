
/**
 * @api {post} /api/data/create Create Data Sheet
 * @apiName CreateData
 * @apiGroup Data
 * 
 * @apiBody {Number} [type=0] Optional Type with default 0
 *
 * @apiSuccess {String} Created spread sheet URL.
 * 
 */
const create = async (ctx) => {
    const { type } = ctx.request.body;
    console.log(`create sheet by template ${type}`);

    ctx.body = {
        url: "http://testurl"
    };
};

module.exports = { create };