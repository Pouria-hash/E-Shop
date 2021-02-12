const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: String
},
    {
        timestamps: true
    })

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User