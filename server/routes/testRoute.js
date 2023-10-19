// Routes for homepage


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/testController.js');

// ====== ROUTES ======

router.get('/', controller.page);

// ====== EXPORTS ======

module.exports = router;