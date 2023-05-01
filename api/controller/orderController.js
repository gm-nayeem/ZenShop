const Order = require('../models/Order');

const createOrder = async (req, res, next) => {
    const { order } = req.body;
    const newOrder = new Order(order);

    try {
        await newOrder.save();
        res.status(201).json({
            sucess: true,
            message: 'Order created successfully'
        });
    } catch (err) {
        next(err);
    }
}

const updateOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
}

const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        next(err);
    }
}

const findOrder = async (req, res, next) => {
    const orderId = req.params?.id;

    try {
        const order = await Order.findById(orderId);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}

const getSingleOrder = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

const getAllOrder = async (req, res, next) => {
    const query = req.query?.new;

    try {
        const orders = query
            ? await Order.find().sort({ createdAt: -1 })
            : await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}

const getIncome = async (req, res, next) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    findOrder,
    getSingleOrder,
    getAllOrder,
    getIncome
}