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
        console.log('Login Successful');
        req.session.userid = req.body.username;
        res.redirect(req.body.requestedPath);
    } else {
        console.log('Login Unsuccessful');
        res.send('Login Unsuccessful');
    }
}

function notFound (req, res, next) {
    res.send('Login route not found');
}


// ====== EXPORTS ======

module.exports = {
    page,
    handleLoginRequest,
    notFound
}