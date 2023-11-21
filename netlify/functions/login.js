const userInfos = require("../userInfos");
const cookie = require('cookie')

exports.handler = async function (event, context) {
    const data = JSON.parse(event.body) || {}
    const { id, password } = data;

    const user = userInfos.users[id];

    if (!user || user.password !== password) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: '아이디가 존재하지 않습니다.' })
        };
    }

    const myCookie = cookie.serialize('HIMUPSI_AUTH', user.uid, {
        secure: true,
        httpOnly: true,
        domain: '.himupsi.com',
        maxAge: 86400000,
      })

    return {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify(user)),
        setCookies: [myCookie]
    };
};
