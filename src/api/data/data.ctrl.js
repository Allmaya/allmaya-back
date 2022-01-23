const auth = require('../auth');
const sheetCtrl = require('./sheet.ctrl');

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
    const id = 0;
    const { type } = ctx.request.body;
    console.log(`create sheet by template ${type}`);

    const authGoogle = await sheetCtrl.authorizeGoogle();
    console.log("1;;;;;;;;;;;", authGoogle);

    const spreadSheetId = await sheetCtrl.createSheet(authGoogle, `TYPE:${type}_ID:${id}`);

    await sheetCtrl.copyTemplate(authGoogle, spreadSheetId, type);

    ctx.body = {
        url: `https://docs.google.com/spreadsheets/d/${spreadSheetId}`
    };
};

module.exports = { create };