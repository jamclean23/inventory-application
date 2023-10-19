// Middleware for detecting a login session and rerouting

// ====== FUNCTIONS ======

function loginHandler (req, res, next) {
    if (!req.session.userid) {   
        console.log('credentials not found');
        if (/\/login/.test(req.path)) {
            next();
        } else if (/\/login*([login.js]|[handleLoginRequest.js])/.test(req.path)) {
            res.redirect('/login');
        }
    } else {
        console.log('credentials found');
        next();
    }
}


// ====== EXPORTS ======

module.exports = loginHandler;