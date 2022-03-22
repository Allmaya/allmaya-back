const { User } = require('../../models/user');
const responseUtils = require('../../lib/response');
const STATUS = require('../../lib/status');

const list = async (ctx) => {
    try {
        const users = await User.find().exec();
        
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_OK, 'success to get list.');
        ctx.body.users = users;
    } catch (e) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNKNOWN, `fail to get list. ${e}`);
        return;
    }
};

module.exports = { list };