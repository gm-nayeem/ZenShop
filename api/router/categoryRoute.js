const router = require('express').Router();
const {
    createCategory,
    deleteCategory,
    updateCategory,
    getAllCategory
} = require('../controller/categoryController');


router.post('/create', createCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/all', getAllCategory);

module.exports = router;