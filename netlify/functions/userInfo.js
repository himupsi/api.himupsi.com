const userInfos = require("../userInfos");
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

    const { cookies } = context;
    const uid = cookies.get(HIMUPSI_AUTH);
    const userId = userInfos.sessionMap[uid];

    if (uid === null || userId === undefined) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: '로그인되지 않았습니다.' })
        };
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify(userInfos.users[userId])),
    };
};
