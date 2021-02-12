const express = require('express');
const router = express.Router();
const Order = require('../models/order')
const { isLoggedIn, admin } = require('../utily/middleware')
const wrapAsync = require('../utily/wrapAsync')
const ExpressError = require('../utily/ExpressError')


router.get('/admin/orderlist', isLoggedIn, admin, (req, res) => {
    res.render('admin/orderlist')
})

router.get('/api/admin/orders', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const orders = await Order.find({}).populate("user")
    res.json(orders)
}))

router.put('/api/admin/orders/:id/deliver', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true,
            order.deliveredAt = Date.now()
        const deliverOrder = await order.save()
        res.json(deliverOrder)
    } else {
        throw new ExpressError('order not found', 404)
    }
}))

module.exports = router