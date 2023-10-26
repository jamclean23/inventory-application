// Routes for db_query


// ====== IMPORTS ======

const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers/dbQueryController.js');

// ====== ROUTES ======

router.get('/find', controller.find);
router.post('/add', controller.add);
router.post('/remove', controller.remove);
router.get('/find_by_id', controller.findById);
router.post('/update', controller.update);



// ====== EXPORTS ======

module.exports = router;