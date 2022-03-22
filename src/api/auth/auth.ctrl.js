const { OAuth2Client } = require('google-auth-library');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { SNS_GOOGLE } = require('../../lib/def');
const STATUS = require('../../lib/status');
const responseUtils = require('../../lib/response');
const { User } = require('../../models/user');

const login = async (ctx) => {
    try {
        const sns_token = ctx.request.header.authorization
        if (!sns_token) {
            responseUtils.setBasicResponse(ctx, STATUS.STATUS_BAD_REQUEST, 'there is no sns token.');
            return;
        }
        console.log(sns_token);

        const schema = Joi.object().keys({
            sns_type: Joi.string().required()
        });

        const result = schema.validate(ctx.request.body);
        if (result.error) {
            responseUtils.setBasicResponse(ctx, STATUS.STATUS_BAD_REQUEST, result.error);
            return;
        }

        const { sns_type } = ctx.request.body;

        let loginData = null;
        switch (sns_type) {
            case SNS_GOOGLE:
                loginData = await googleLogin(sns_token);
                if (!loginData) {
                    responseUtils.setBasicResponse(ctx, STATUS.STATUS_BAD_REQUEST, 'fail to get google login info.');
                    return;
                }
                break;
            default: 
                responseUtils.setBasicResponse(ctx. STATUS.STATUS_BAD_REQUEST, `unknown login type. pleae set "sns_type" properly. (your data : ${sns_type})`);
                return;
        }

        if (!loginData) {
            responseUtils.setBasicResponse(ctx, STATUS.STATUS_BAD_REQUEST, 'fail to generate token.');
            return;
        }

        const userId = `${sns_type}_${loginData.snsId}`;
        const exists = await User.findByUserId(userId);
        if (!exists) {
            const user = new User({
                userName: loginData.name,
            });
            await user.setUserId(userId);
            await user.save();
        }

        responseUtils.setBasicResponse(ctx, STATUS.STATUS_OK, 'success to login.');
        ctx.body.name = loginData.name,
        ctx.body.picture = loginData.picture,

        ctx.cookies.set('access_token', loginData.access_token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
    } catch(e) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNKNOWN, `fail to login. :: ${e}`);
        return;
    }
};

const withdrawal = async (ctx) => {
    const { loginuser } = ctx.state;
    if (!loginuser) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNAUTHORIZED, 'need authorization.');
        return;
    }

    try {
        const user = await User.findByUserId(loginuser.userid);
        await User.findByIdAndRemove(user._id).exec();
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_OK, 'success to withdrawl.');
    } catch (e) {
        responseUtils.setBasicResponse(ctx, STATUS.STATUS_UNKNOWN, `fail to withdrawl. :: ${e}`);
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
        const accessToken = await generateAccessToken(SNS_GOOGLE, payload['name'], payload['sub']);
        return {
            name: payload['name'],
            snsId: payload['sub'],
            picture: payload['picture'],
            access_token: accessToken,
        };
    } catch(e) {
        console.log(e);
        return null;
    }
};

const generateAccessToken = async (sns_type, name, snsId) => {
    console.log(snsId);
    const token = await jwt.sign(
        {
            name: name,
            user_id: `${sns_type}_${snsId}`,
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