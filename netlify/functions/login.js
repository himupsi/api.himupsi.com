const userInfos = require("../userInfos");
const cookie = require('cookie')
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'https://id.himupsi.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Aceess-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true'
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
    const userInfo = userInfos.users[id];

    if (!userInfo || userInfo.password !== password) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: '아이디가 존재하지 않습니다.' })
        };
    }

    const authId = userInfos.userAuthIdMap[id];


    const myCookie = cookie.serialize('HIM_AUTH', authId, {
        httpOnly: true,
        domain: '.himupsi.com',
        path: '/',
      })

    return {
        statusCode: 200,
        body: JSON.stringify({
            name,
            avatar,
        }),
        headers: {
            'Set-Cookie': myCookie,
            'Content-Type': 'application/json',
            ...CORS_HEADERS
        },
    };
};
