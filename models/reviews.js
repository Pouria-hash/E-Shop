const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rate: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review