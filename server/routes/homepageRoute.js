// Routes for homepage


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controllers
const homepageController = require('../controllers/homepageController.js');

// ====== ROUTES ======

router.get('/', homepageController.homepage);


// ====== EXPORTS ======

module.exports = router;