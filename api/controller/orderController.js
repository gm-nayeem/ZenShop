const Order = require('../models/Order');

const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
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
        res.status(500).json(err);
    }
}

const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSingleOrder = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
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
        res.status(500).json(err);
    }
}


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getSingleOrder,
    getAllOrder,
    getIncome
}