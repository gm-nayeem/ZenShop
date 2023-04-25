const Category = require('../models/Category');
const createError = require('../utils/error');

const createCategory = async  (req, res, next) => {
    const newCategory = new Category(req.body);

    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        next(err);
    }
}

const updateCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCategory);
    } catch (err) {
        next(err);
    }
}

const deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json("Category has been deleted...");
    } catch (err) {
        next(err);
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    getAllCategory
}