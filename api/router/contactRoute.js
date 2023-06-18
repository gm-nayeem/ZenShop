const router = require('express').Router();
const {
    contactController, mailController
} = require('../controller/contactController');

const {verifyTokenAndAuthorization} = require('../middleware/authenticate');

router.post('/', verifyTokenAndAuthorization, contactController);

router.post('/mail', verifyTokenAndAuthorization, mailController);

module.exports = router;

