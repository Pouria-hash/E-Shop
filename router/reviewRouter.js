const express = require('express')
const router = express.Router({ mergeParams: true })
const Review = require('../models/reviews')
const Product = require('../models/products')
const wrapAsync = require('../utily/wrapAsync')
const { isLoggedIn } = require('../utily/middleware')



router.post('/api/products/:id/reviews', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params
    const newReview = req.body
    const review = new Review(newReview)
    const product = await Product.findById(id).populate("reviews")

    if (product && review) {
        review.author = req.user._id
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = Number(product.reviews.reduce((acc, item) => item.rate + acc, 0) / product.numReviews).toFixed(1)
        await review.save()
        await product.save()

        res.status(202).json(product)
    } else {
        throw new Error('Product or Review not found')
    }
}))


module.exports = router