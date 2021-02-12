const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const generateToken = require('../utily/generateToken')
const { isLoggedIn } = require('../utily/middleware')

router.get('/register', (req, res) => {
    res.render('user/registerFront')
})

router.post('/api/user/register', async (req, res, next) => {
    const { email, password, username } = req.body
    const u = new User({ email, username })
    const user = await User.register(u, password)
    if (user) {
        req.logIn(user, err => {
            if (err) return next(err)
            const { _id, username, email, isAdmin } = req.user
            res.json({ _id, username, email, isAdmin })
        })
    } else {
        throw new Error('invalid input')
    }

})

router.get('/login', async (req, res, next) => {
    res.render('user/loginFront')
})



router.post('/api/user/login', passport.authenticate('local'), (req, res) => {
    console.log('you logged in')
    const token = generateToken(req.user._id)
    const { _id, username, email, isAdmin } = req.user
    res.json({ _id, username, email, isAdmin, token })
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('user/profile')
})

router.get('/api/user/profile', isLoggedIn, async (req, res) => {
    res.json(req.user)
})

router.put('/api/user/profile', isLoggedIn, async (req, res) => {
    const { id } = req.user
    const { username, email, address, password } = req.body
    const user = await User.findById(id)
    if (user) {
        user.username = username;
        user.email = email;
        user.address = address;
        const updateUser = await user.save()
        res.json(updateUser)
    } else {
        throw new Error('user not found')
    }
})

router.post('/api/user/logout', isLoggedIn, async (req, res) => {
    req.logOut()
    console.log('you logged out')
    res.redirect('/products')
})

module.exports = router