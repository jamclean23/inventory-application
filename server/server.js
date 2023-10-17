// ****** WEB SERVER ******


// ====== IMPORTS ======

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env'});

// Controllers

const fourOhFour = require('./controllers/fourOhFour.js');


// ====== SETUP ======

// Express

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


// ====== MIDDLEWARE ======

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ====== ROUTES ======

app.get('/', (req, res) => {
    res.send('blah');
})

app.get('*', fourOhFour);


// ====== LISTENERS ======

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})