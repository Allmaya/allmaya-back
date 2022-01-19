
const test = async (ctx) => {
    const { id } = ctx.params;

    console.log(id);
};

module.exports = { test };