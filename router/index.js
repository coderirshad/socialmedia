const express = require('express');
const router = express.Router();
console.log('router loaded');
const homecontroller = require('../controller/home_controller');
router.get('/',homecontroller.home);


module.exports = router;