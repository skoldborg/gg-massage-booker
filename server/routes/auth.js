const authHelper = require('../helpers/auth');

exports.authorize = async function(req, res) {
    const code = req.query.code;

    if (code) {
        let token;

        try {
            token = await authHelper.getTokenFromCode(code, res);

            console.log('token: ', token);
        } catch (error) {
            console.error(`Error exchanging code for token ${error}`);
        }
    }

    res.redirect('/');
}

exports.signout = function(req, res) {
    authHelper.clearCookies(res);

    res.redirect('/');
}
