const userInfos = require("../userInfos");

exports.handler = async function (event, context) {
    console.log(userInfos.users.himupsi);
    return {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify(userInfos.users.himupsi)),
        setCookies: ['user=himupsi']
    };
};
