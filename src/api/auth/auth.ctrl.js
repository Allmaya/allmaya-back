
/*
    POST /api/auth/register
    {
        sns_token: ''
    }
*/
const register = async (ctx) => {
    const { sns_token } = ctx.request.body;

    ctx.body = `register - not implemented! received : ${sns_token}`;
    ctx.cookies.set('access_token', 'register - not implemented!', {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
    });
};

/*
    POST /api/auth/login
    {
        sns_token: ''
    }
*/
const login = async (ctx) => {
    const { sns_token } = ctx.request.body;

    ctx.body = `login - not implemented! received : ${sns_token}`;
    ctx.cookies.set('access_token', 'login - not implemented!', {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
    });
};

/*
    GET /api/auth/check
*/
const check = async (ctx) => {
    ctx.body = 'check - not implemented!';
};

/*
    POST /api/auth/logout
*/
const logout = async (ctx) => {
    ctx.body = 'loout - not implemented!';
    ctx.status = 204; // No Content
};

module.exports = { register, login, check, logout };