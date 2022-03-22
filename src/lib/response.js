const STATUS = require("./status");

const setBasicResponse = async (ctx, statusCode, message) => {
    let statusMsg;
    switch (statusCode) {
        case STATUS.STATUS_OK:
            statusMsg = STATUS.STATUS_MSG_OK;
            break;
        case STATUS.STATUS_OK_NO_CONTENT:
            statusMsg = STATUS.STATUS_MSG_OK_NO_CONTENT;
            break;
        case STATUS.STATUS_BAD_REQUEST:
            statusMsg = STATUS.STATUS_MSG_BAD_REQUEST;
            break;
        case STATUS.STATUS_UNAUTHORIZED:
            statusMsg = STATUS.STATUS_MSG_UNAUTHORIZED;
            break;
        case STATUS.STATUS_UNKNOWN:
            statusMsg = STATUS.STATUS_MSG_UNKNOWN;
            break;
        default: 
            statusMsg = STATUS.STATUS_MSG_UNKNOWN;
    }

    ctx.status = statusCode;
    ctx.body = { 
        status: statusCode,
        message: `[${statusMsg}] ${message}`,
    };
}

module.exports = { setBasicResponse };