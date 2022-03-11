const { User } = require("../../models/user");

const list = async (ctx) => {
    try {
        const users = await User.find().exec();
        ctx.body = users;
    } catch (e) {
        ctx.throw(e);
        return;
    }
};

module.exports = { list };