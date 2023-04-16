const router = require('express').Router();
const {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getSingleProduct
} = require('../controller/productController');


router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/single/:id', getSingleProduct);
router.get('/all', getAllProduct);

module.exports = router;