// Middleware for detecting a login session and rerouting

// ====== FUNCTIONS ======

function loginHandler (req, res, next) {
    if (!req.session.userid) {   
        console.log('\nCredentials not found, using login handler');
        if (/\/login/.test(req.path)) {
            next();
        } else if (/\/login*([login.js]|[handleLoginRequest.js]|[handleLogoutRequest])/.test(req.path)) {
            res.redirect('/login' + req.path);
        } else {
            res.redirect('/login' + req.path);
        }
    } else {
        console.log('credentials found');
        next();
    }
}


// ====== EXPORTS ======

module.exports = loginHandler;