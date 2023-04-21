const router = require('express').Router();
const {contactController} = require('../controller/contactController');

const {verifyTokenAndAuthorization} = require('../middleware/authenticate');

router.post('/', verifyTokenAndAuthorization, contactController);

module.exports = router;

