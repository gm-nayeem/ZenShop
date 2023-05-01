const router = require("express").Router();

const {
    createOrder,
    updateOrder,
    deleteOrder,
    findOrder,
    getSingleOrder,
    getAllOrder,
    getIncome
} = require('../controller/orderController');

const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../middleware/authenticate');

router.post('/', verifyToken, createOrder);

router.put('/:id', verifyTokenAndAdmin, updateOrder);

router.delete('/:id', verifyTokenAndAdmin, deleteOrder);

router.get('/find/:id', verifyTokenAndAdmin, findOrder);

router.get('/single/:userId', verifyTokenAndAuthorization, getSingleOrder);

router.get('/all', verifyTokenAndAdmin, getAllOrder);

// get monthly income
router.get('/income', verifyTokenAndAdmin, getIncome);


module.exports = router;