
const register = async (ctx) => {
    ctx.body = 'register';
};

const login = async (ctx) => {
    ctx.body = 'login';
};

const check = async (ctx) => {
    ctx.body = 'check';
};

const logout = async (ctx) => {
    ctx.body = 'logout';
};

module.exports = { register, login, check, logout };