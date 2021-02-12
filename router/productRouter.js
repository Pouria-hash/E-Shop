const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const wrapAsync = require('../utily/wrapAsync')

router.get('/products', (req, res) => {
    res.render('products/index')
})

router.get('/api/products', wrapAsync(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pagenum) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: (req.query.keyword),
            $options: 'i'
        }
    } : {}
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
}))

router.get('/api/products/top', wrapAsync(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
}))

router.get('/page/:pagenum?', (req, res) => {
    res.render('products/page')
})

router.get('/products/:id', (req, res) => {
    res.render('products/show')
})

router.get('/api/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("user")
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }

}))




module.exports = router