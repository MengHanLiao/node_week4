var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.getUser);

router.post('/', userController.registerUser);

module.exports = router;
