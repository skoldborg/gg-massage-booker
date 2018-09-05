const authHelper = require('../helpers/auth');

exports.authorize = async function(req, res) {
    const code = req.query.code;

    if (code) {
        try {
            const token = await authHelper.getTokenFromCode(code, res);

            console.log('Token saved to cookies');
        } catch (error) {
            console.error(`Error exchanging code for token ${error}`);
        }
    }

    res.redirect('/');
}

exports.gettoken = async function(req, res) {
    const token = await authHelper.getAccessToken(req.cookies, res);

    res.json({ token: token });
}

exports.signin = function(req, res) {
    const authUrl = authHelper.getAuthUrl();

    res.redirect(authUrl);
}

exports.signout = function(req, res) {
    authHelper.clearCookies(res);

    res.redirect('/');
}
