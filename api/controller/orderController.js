const Order = require('../models/Order');
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const createOrder = async (req, res, next) => {
    const { products, userId, totalAmount } = req.body;

    // order demo
    const order = {
        userId,
        products: [],
        amount: totalAmount,
        stripeId: ""
    };

    // insert products into order
    products.map(p => order.products.push(
        { 
            productId: p.id,
            title: p.title,
            desc: p.desc,
            quantity: p.quantity ,
            price: p.price
        }
    ));

    // custom products info 
    const lineItems = await Promise.all(
        products.map(async product => {
            const singleProduct = await Product.findById(product.id);
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: singleProduct.title,
                    },
                    unit_amount: Math.round(singleProduct.price * 100)
                },
                quantity: product.quantity
            }
        })
    );

    try {
        // stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.SUCCESS_URL}`,
            cancel_url: `${process.env.CANCEL_URL}`,
            shipping_address_collection: { allowed_countries: ["US", "CA", "BD"] },
            payment_method_types: ["card"],
        });

        const newOrder = new Order({
           ...order,
            stripeId: session.id
        });

        await newOrder.save();
        res.status(201).json({ stripeSession: session });
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
    try {
        const orders = await Order.find();
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
    getSingleOrder,
    getAllOrder,
    getIncome
}