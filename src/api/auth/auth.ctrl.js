const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
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
    try {
        const sns_token = ctx.request.header.authorization
        const { sns_type } = ctx.request.body;

        let loginData = null;
        switch (sns_type) {
            case 'google':
                loginData = await googleLogin(sns_token);
                if (!loginData) {
                    ctx.body = { status: 'fail to get google login info.' };
                    return;
                }
                break;
            default: 
                ctx.body = { status: `unknown login type. pleae set "sns_type" properly. (your data : ${sns_type})` };
                return;
        }

        if (!loginData) {
            ctx.body = { status: 'fail to generate token.' };
            return;
        }

        ctx.body = {
            status: `login success.`,
            name: loginData.name,
        };
        ctx.cookies.set('access_token', loginData.access_token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
    } catch(e) {
        ctx.body = {
            status: `unkonwn error`
        };
    }
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

const googleLogin = async (token) => {
    const client = new OAuth2Client("1086826951090-g9t67u1quhor33kfsqvb7niuut5i2eur.apps.googleusercontent.com");
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "1086826951090-g9t67u1quhor33kfsqvb7niuut5i2eur.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const accessToken = await generateAccessToken(payload['name'], payload['sub']);
        return {
            name: payload['name'],
            access_token: accessToken,
        };
    } catch(e) {
        console.log(e);
        return null;
    }
};

const generateAccessToken = async (name, userId) => {
    const token = await jwt.sign(
        {
            name: name,
            user_id: userId,
        },
        'SecretKey',
        {
            subject: 'access_token',
            expiresIn: '7d',
            issuer: 'allmaya',
        }
    );
    return token;
};