const Category = require('../models/Category');

const createCategory = async  (req, res, next) => {
    const newCategory = new Category(req.body);

    try {
        const savedCategory = await newCategory.save();
        res.status(200).json({ savedCategory });
    } catch (err) {
        res.status(500).json(err);
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
        res.status(500).json(err);
    }
}

const deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json("Category has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    getAllCategory
}