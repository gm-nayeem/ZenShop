const SubCategory = require('../models/SubCategory');

const createSubCategory = async  (req, res, next) => {
    const newSubCategory = new SubCategory(req.body);

    try {
        const savedSubCategory = await newSubCategory.save();
        res.status(200).json({ savedSubCategory });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateSubCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedSubCategory);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteSubCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        await SubCategory.findByIdAndDelete(id);
        res.status(200).json("SubCategory has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllSubCategory = async (req, res, next) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createSubCategory,
    deleteSubCategory,
    updateSubCategory,
    getAllSubCategory
}