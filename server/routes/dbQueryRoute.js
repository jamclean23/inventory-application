// Routes for db_query


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/dbQueryController.js');

// ====== ROUTES ======

router.get('/find_all', controller.findAll);


// ====== EXPORTS ======

module.exports = router;