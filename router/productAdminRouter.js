const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const { isLoggedIn, admin } = require('../utily/middleware')
const wrapAsync = require('../utily/wrapAsync')



router.get('/admin/productlist/:pagenum?', isLoggedIn, admin, (req, res) => {
    res.render('admin/productList')
})

router.delete('/api/admin/products/:id', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed successfully' })
    } else {
        throw new Error('Product not found')
    }
}))

router.get('/admin/products/new', isLoggedIn, admin, wrapAsync(async (req, res) => {
    res.render('admin/newproduct')
}))

router.post('/api/admin/products', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const product = req.body
    const newProduct = new Product(product)
    newProduct.user = req.user._id
    await newProduct.save()
    res.json({ message: "Successfully create new product" })
}))

router.get('/admin/products/:id/edit', isLoggedIn, admin, wrapAsync(async (req, res) => {
    res.render('admin/editproduct')
}))

router.put('/api/admin/products/:id/edit', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (product) {
        const updateProduct = await Product.findByIdAndUpdate(id, req.body)
        res.json(updateProduct)
    } else {
        throw new Error("Product not found")
    }
}))


module.exports = router