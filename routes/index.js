var express = require('express');
var router = express.Router();
var employeeController = require('../controller/employeeController')

/* GET home page. */
router.get('/', employeeController.findHighestPaidEmployee);

module.exports = router;
