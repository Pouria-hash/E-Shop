const express = require('express')
const router = express.Router()
const ExpressError = require('../utily/ExpressError')
const Order = require('../models/order')
const { isLoggedIn } = require('../utily/middleware')


router.get('/placeorder', (req, res) => {
    res.render('cart/placeOrderScreen')
})


router.post('/api/orders', isLoggedIn, async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        itemsPrice,
        shoppingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        throw new ExpressError('No Order Items', 400)
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            taxPrice,
            itemsPrice,
            shoppingPrice,
            totalPrice,
        })
        const createOrder = await order.save()
        res.status(200).json(createOrder)
    }

})

router.post('/api/orders/:id', isLoggedIn, async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user')
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('orders not found')
    }
})

router.put('/api/order/:id/pay', isLoggedIn, async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
        const updateOrder = await order.save()

        res.status(200).json(updateOrder)
    } else {
        res.status(404)
        throw new Error('orders not found')
    }
})

router.get('/api/order/myorder', isLoggedIn, async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
})

router.get('/order/:id', (req, res) => {
    res.render('cart/orderScreen')
})
module.exports = router