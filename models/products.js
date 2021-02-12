const mongoose = require('mongoose')
const Schema = mongoose.Schema



const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: String,
    image: {
        type: String,

    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Electronics"]
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]

},
    {
        timestamps: true
    }
)


const Product = mongoose.model('Product', productSchema)

module.exports = Product