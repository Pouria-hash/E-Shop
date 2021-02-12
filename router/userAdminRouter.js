const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const generateToken = require('../utily/generateToken')
const { isLoggedIn, admin } = require('../utily/middleware')
const wrapAsync = require('../utily/wrapAsync')

// list of user screen

router.get('/admin/userlist', (req, res) => {
    res.render('admin/userList')
})

//list of user

router.get('/api/users', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const users = await User.find({})
    res.json(users)
}))

//get user data by admin

router.get('/admin/user/:id', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        throw new Error('User not found')
    }
}))

//edit user screen by admin

router.get('/admin/user/:id/edit', isLoggedIn, admin, wrapAsync(async (req, res) => {
    res.render('admin/userDetail')
}))

//edit user by admin

router.put('/admin/user/:id', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.fullName = req.body.fullName || user.fullName
        user.isAdmin = req.body.isAdmin
        await user.save()
        res.json(user)
    } else {
        throw new Error('User not found')
    }
}))

router.delete('/api/users/:id', isLoggedIn, admin, wrapAsync(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (user) {
        await User.findByIdAndDelete(id)
        const message = "user successfuly remove"
        res.json(message)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
}))

module.exports = router