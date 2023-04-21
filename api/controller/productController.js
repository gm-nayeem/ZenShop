const Product = require('../models/Product');

const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json({ savedProduct });
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSingleProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllProduct = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getSingleProduct
}