const Product = require('../models/Product');

const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json({ savedProduct });
    } catch (err) {
        next(err);
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
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        next(err);
    }
}

const getSingleProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

const getAllProduct = async (req, res, next) => {
    const qNew = req.query.new;
    const qType = req.query.type;
    const qCategory = req.query.category;
    const qSubCat = req.query.subCat;
    const qMaxPrice = req.query.maxPrice;
    const qSort = req.query.sort;

    // console.log(qCategory, qSubCat, qMaxPrice, qSort);z

    try {
        let products;

        if (qType) {
            products = await Product.find({type: qType}).sort({ createdAt: -1 }).limit(4);
        }
        else if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } 
        else {
            products = await Product.find({
                categories: qCategory,
                price: {$lte: qMaxPrice},
            })
        }

        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getSingleProduct
}