// Routes for homepage


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/loginController.js');

// ====== ROUTES ======

router.get('/handleLogoutRequest', controller.handleLogoutRequest);
router.get('/', controller.page);
router.post('/handleLoginRequest', controller.handleLoginRequest);
router.get('/*', controller.page);


// ====== EXPORTS ======

module.exports = router;