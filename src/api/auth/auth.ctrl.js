const { OAuth2Client } = require('google-auth-library');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { STATUS_BAD_REQUEST, STATUS_UNKNOWN, STATUS_OK, STATUS_OK_NO_CONTEST } = require('../../lib/status');
const { User } = require('../../models/user');

const login = async (ctx) => {
    console.log('0');
    try {
        const sns_token = ctx.request.header.authorization
        if (!sns_token) {
            ctx.status = STATUS_BAD_REQUEST;
            ctx.body = { status: 'there is no sns token' };
            return;
        }
        console.log('1');

        const schema = Joi.object().keys({
            sns_type: Joi.string().required()
        });
        console.log('2');

        const result = schema.validate(ctx.request.body);
        if (result.error) {
            ctx.status = STATUS_BAD_REQUEST;
            ctx.body = result.error;
            return;
        }
        console.log('3');

        const { sns_type } = ctx.request.body;

        let loginData = null;
        switch (sns_type) {
            case 'google':
                loginData = await googleLogin(sns_token);
                if (!loginData) {
                    ctx.status =  STATUS_BAD_REQUEST;
                    ctx.body = { status: 'fail to get google login info.' };
                    return;
                }
                break;
            default: 
                ctx.status = STATUS_BAD_REQUEST;
                ctx.body = { status: `unknown login type. pleae set "sns_type" properly. (your data : ${sns_type})` };
                return;
        }

        if (!loginData) {
            ctx.status = STATUS_BAD_REQUEST;
            ctx.body = { status: 'fail to generate token.' };
            return;
        }

        console.log('4');
        const userId = `${sns_type}_${loginData.snsId}`;
        const exists = await User.findByUserId(userId);
        if (!exists) {
            const user = new User({
                userName: loginData.name,
            });
            await user.setUserId(userId);
            await user.save();
        }
        console.log('5');

        ctx.body = {
            status: `login success.`,
            name: loginData.name,
        };
        ctx.cookies.set('access_token', loginData.access_token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
        ctx.status = STATUS_OK;
    } catch(e) {
        ctx.throw(STATUS_UNKNOWN, e);
        return;
    }
};

const withdrawal = async (ctx) => {
    const { loginuser } = ctx.state;
    if (!loginuser) {
        ctx.status = STATUS_UNAUTHORIZED;
        return;
    }

    try {
        const user = await User.findByUserId(loginuser.userid);
        await User.findByIdAndRemove(user._id).exec();
        ctx.status = STATUS_OK_NO_CONTEST;
        console.log(user);
    } catch (e) {
        ctx.throw(STATUS_UNKNOWN, e);
    }
}

module.exports = { login, withdrawal };

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
            snsId: payload['sub'],
            access_token: accessToken,
        };
    } catch(e) {
        console.log(e);
        return null;
    }
};

const generateAccessToken = async (name, snsId) => {
    const token = await jwt.sign(
        {
            name: name,
            user_id: snsId,
        },
        process.env.JWT_SECRET,
        {
            subject: 'access_token',
            expiresIn: '7d',
            issuer: 'allmaya',
        }
    );
    return token;
};