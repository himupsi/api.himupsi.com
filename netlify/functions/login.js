const userInfos = require("../userInfos");
const cookie = require('cookie')
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Aceess-Control-Max-Age': '86400'
}

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
        }
    }

    const data = JSON.parse(event.body) || {}
    const { id, password } = data;
    const user = userInfos.users[id];

    if (!user || user.password !== password) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: '아이디가 존재하지 않습니다.' })
        };
    }

    const sessionId = userInfos.sessionMap[id];


    const myCookie = cookie.serialize('HIMUPSI_AUTH', sessionId, {
        secure: true,
        httpOnly: true,
        domain: '.himupsi.com',
        maxAge: 86400000,
      })

    return {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify(user)),
        headers: {
            'Set-Cookie': myCookie,
            'Content-Type': 'application/json',
            ...CORS_HEADERS
        },
    };
};
