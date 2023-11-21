const userInfos = require("../userInfos");
const cookie = require('cookie')

exports.handler = async function (event, context) {
    const myCookie = cookie.serialize('HIMUPSI_AUTH', 'asdfasdfasdf', {
        secure: true,
        httpOnly: true,
        domain: '.himupsi.com',
        maxAge: 86400000,
      })

    return {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify(userInfos.users.himupsi)),
        setCookies: [myCookie]
    };
};
