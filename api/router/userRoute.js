const router = require("express").Router();
const {
    updateUser, deleteUser,
    getSingleUser, getAllUser,
    getUserStats
} = require("../controller/userController");

router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/single/:id', getSingleUser);
router.get('/all', getAllUser);
router.get('/stats', getUserStats);


module.exports = router;
