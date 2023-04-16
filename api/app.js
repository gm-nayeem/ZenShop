// external import
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./config/database');

// internal import 
const authRoute = require('./router/authRoute')
const userRoute = require('./router/userRoute')
const productRoute = require('./router/productRoute')
const orderRoute = require('./router/orderRoute')
const categoryRoute = require('./router/categoryRoute')
const subCategoryRoute = require('./router/subCategoryRoute')
const paymentRoute = require('./router/stripe')

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


// routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/subCategories", subCategoryRoute)
app.use("/api/checkout", paymentRoute)


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our E-commerce application"
    })
});

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


// server port 
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`Server is running successfully`);
})
