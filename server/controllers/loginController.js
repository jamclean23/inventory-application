// Controller for login page

// ====== VARIABLES ======

const testWhitelist = {
    "Jesse": "sdfsdf"
};


// ====== FUNCTIONS ======

function page (req, res) {
    res.render('login');
}

function handleLoginRequest (req, res, next, whitelist = testWhitelist) {
    console.log(req.body);

    if (req.body.password === whitelist[req.body.username]) {
        console.log('\x1b[33m**********\x1b[37m');
        console.log('Login Successful');
        req.session.userid = req.body.username;
        console.log('Attempted path: ' + req.body.requestedPath);
        res.redirect(req.body.requestedPath);
    } else {
        console.log('\x1b[33m**********\x1b[37m');  
        console.log('Login Unsuccessful');
        console.log('Attempted path:' + req.body.requestedPath);
        res.render('login', {
            loginErrorMsg: 'Username/Password not found.<br/>Contact administrator to resolve.',
            passedPath: req.body.requestedPath
        });
    }
}

function notFound (req, res, next) {
    res.send('Login route not found');
}

function handleLogoutRequest (req, res, next) {

    // Remove session cookie and redirect to login page
    req.session.destroy();
    console.log('LOGGING OUT');
    res.redirect('/login');
}

// ====== EXPORTS ======

module.exports = {
    page,
    handleLoginRequest,
    handleLogoutRequest,
    notFound
}