import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = (props) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            props.history.push('/shipping')
        }
    })

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Payment Method'
    })



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }



    return (
        <FormContainer>
            <h1>Payment Method</h1>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler} >
                <h4>SELECT METHOD</h4>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        value="PayPal"
                        name="paymentMethod"
                        id="PayPal"
                        checked
                        onChange={e => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" for="PayPal">
                        PayPal
            </label>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input"
                        type="radio"
                        value="Stripe"
                        name="paymentMethod"
                        id="stripe"
                        onChange={e => setPaymentMethod(e.target.value)} />
                    <label className="form-check-label" for="stripe">
                        Stripe
            </label>
                </div>


                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
