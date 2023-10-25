// ****** WEB SERVER ******


// ====== IMPORTS ======

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env'});

// Routes
const homepageRoute = require('./routes/homepageRoute.js');
const testRoute = require('./routes/testRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const dbQueryRoute = require('./routes/dbQueryRoute.js');

// Controller
const fourOhFourController = require('./controllers/fourOhFourController.js');
const loginHandler = require('./middleware/loginHandler/loginHandler.js');

// Session
const cookieParser = require('cookie-parser'); 
const sessions = require('express-session');


// ====== SETUP ======

// Express

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


// ====== MIDDLEWARE ======

app.use((req, res, next) => {
    console.log('\n\x1B[34m********\nNew Server Request\nPATH: ' + req.url + '\x1B[37m');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
app.use(cookieParser());

app.use(loginHandler);


// ====== ROUTES ======

app.use('/', homepageRoute);
app.use('/test', testRoute);
app.use('/login', loginRoute);
app.use('/db_query', dbQueryRoute);
app.use('*', fourOhFourController);


// ====== LISTENERS ======

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})