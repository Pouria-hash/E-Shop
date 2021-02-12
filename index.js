if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const engine = require('ejs-mate')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const localStrategy = require('passport-local')
const ExpressError = require('./utily/ExpressError')
const User = require('./models/user')
const morgan = require('morgan')


const secret = process.env.SECRET

const productRouter = require('./router/productRouter')
const cartRouter = require('./router/cartRouter')
const userRouter = require('./router/userRouter')
const orderRouter = require('./router/orderRouter')
const userAdminRouter = require('./router/userAdminRouter')
const productAdminRouter = require('./router/productAdminRouter')
const uploadRouter = require('./router/uploadRouter')
const orderAdminRouter = require('./router/orderAdminRouter')
const reviewRouter = require('./router/reviewRouter')

// const DB = process.env.DB_URL || 'mongodb://localhost:27017/E-Shop'
mongoose.connect('mongodb://localhost:27017/E-Shop', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('mongosoe connection open')
    })
    .catch((e) => {
        console.log('mongoose connection error', e)
    })

app.engine('ejs', engine)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const store = new MongoStore({
    url: "mongodb://localhost:27017/E-Shop",
    secret,
    touchAfter: 24 * 60 * 60
})

store.on('error', function (e) {
    console.log('session store error', e)
})

const sessionConfig = {
    store,
    name: "session",
    secret,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httponly: true,
        // secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}

app.use(session(sessionConfig))


app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use(productRouter)
app.use(reviewRouter)
app.use(cartRouter)
app.use(userRouter)
app.use(orderRouter)
app.use(userAdminRouter)
app.use(productAdminRouter)
app.use(uploadRouter)
app.use(orderAdminRouter)


app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.get('/', (req, res, next) => {
    res.send('wellcome')
})

app.use('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next) => {
    console.log(err)
    const { status = 500 } = err
    if (!err.message) err.message = 'invalid data'
    res.status(status).json({ message: err.message })
})

app.listen(3000, () => {
    console.log('seving port 3000')
})