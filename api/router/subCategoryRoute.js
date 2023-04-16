const router = require('express').Router();
const {
    createSubCategory,
    deleteSubCategory,
    updateSubCategory,
    getAllSubCategory
} = require('../controller/categoryController');


router.post('/create', createSubCategory);
router.put('/update/:id', updateSubCategory);
router.delete('/delete/:id', deleteSubCategory);
router.get('/all', getAllSubCategory);

module.exports = router;