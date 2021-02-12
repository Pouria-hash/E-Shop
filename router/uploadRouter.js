const express = require('express')
const router = express.Router()
const { isLoggedIn, admin } = require('../utily/middleware')
const wrapAsync = require('../utily/wrapAsync')
const multer = require('multer');
const storage = require('../cloudinary/config')


const upload = multer({ storage })


router.post('/api/upload', upload.single('image'), isLoggedIn, admin, (req, res) => {
    res.send(req.file.path)
})

module.exports = router