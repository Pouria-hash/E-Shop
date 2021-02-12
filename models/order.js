const mongoose = require('mongoose')
const Schema = mongoose.Schema



const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: [
        {
            name: { type: String },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        state: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: String,
        statue: String,
        update_time: String,
        email_address: String
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,

        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,

        default: false
    },
    status: String,
    deliveredAt: {
        type: Date
    }
},
    {
        timestamps: true
    }
)


const Order = mongoose.model('Order', orderSchema)

module.exports = Order