const express = require('express')
const router = express.Router()


router.get('cart/:id?', (req, res) => {
    res.render('cart/cartScreen')
})

router.get('/shipping', (req, res) => {
    res.render('cart/shipping')
})

router.get('/payment', (req, res) => {
    res.render('cart/payment')
})


module.exports = router
