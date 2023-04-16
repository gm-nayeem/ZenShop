const router = require("express").Router();
const {
    registerController,
    loginController,
    logoutController
} = require("../controller/authController");

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;
