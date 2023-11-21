const userInfos = require("../userInfos");
const cookie = require("cookie");

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Aceess-Control-Max-Age': '86400',
}

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                ...CORS_HEADERS,
            },
        }
    }

    const cookies = cookie.parse(event.headers?.cookies || '');

    const authId = cookies['HIM_AUTH'] || null;
    const userId = userInfos.authIdUserMap[authId];

    if (authId === null || userId === undefined) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: '로그인되지 않았습니다.' + JSON.stringify(event.headers), }),
            headers: CORS_HEADERS,
        };
    }
    const { name, avatar } = userInfos.users[userId] || {};
    return {
        statusCode: 200,
        body: JSON.stringify({
            name,
            avatar,
        }),
        headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json',
        }
    };
};
