const router = require("express").Router();

const {
    createOrder,
    updateOrder,
    deleteOrder,
    getSingleOrder,
    getAllOrder,
    getIncome
} = require('../controller/orderController');

router.post('/create', createOrder);

router.put('/update/:id', updateOrder);

router.delete('/delete/:id', deleteOrder);

router.get('/single/:userId', getSingleOrder);

router.get('/all', getAllOrder);

// GET MONTHLY INCOME
router.get('/income', getIncome);