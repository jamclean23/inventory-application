// Middleware for detecting a login session and rerouting

// ====== FUNCTIONS ======

function loginHandler (req, res, next) {
    console.log('CHECKING CREDENTIALS');
    if (!req.session.userid) {   
        console.log('\nCredentials not found, using login handler');
        if (/\/login/.test(req.path)) {
            next();
        } else if (/\/login*([login.js]|[handleLoginRequest]|[handleLogoutRequest])/.test(req.path)) {
            res.redirect('/login' + req.path);
        } else {
            res.redirect('/login' + req.path);
        }
    } else {
        console.log('credentials found');

        if (/\/login*[handleLogoutRequest]/.test(req.path)) {
            res.redirect('/');
        } else {
            next();
        }
    }
}


// ====== EXPORTS ======

module.exports = loginHandler;