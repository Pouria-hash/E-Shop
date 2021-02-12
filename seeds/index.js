const mongoose = require('mongoose')
const Product = require('../models/products')
const User = require('../models/user')
const Order = require('../models/order')
const products = require('./products')
const users = require('./users')

mongoose.connect('mongodb://localhost:27017/E-Shop', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('mongosoe connection open')
    })
    .catch((e) => {
        console.log('mongoose connection error', e)
    })



const seedDB = async () => {
    try {
        await Product.deleteMany({})
        // await User.deleteMany({})
        // await Order.deleteMany({})
        // const createUser = await User.insertMany(users)
        // const adminUser = createUser[0]._id
        const sampleProduct = products.map(product => {
            return { ...product, user: "6017dbee92eac83063a604e0" }
        })
        const newProducts = await Product.insertMany(sampleProduct)
        console.log(newProducts)
    }
    catch (e) {
        console.log(e)
    }
}

seedDB()