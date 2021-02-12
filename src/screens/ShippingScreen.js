import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = (props) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Shipping Screen'
    })

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, state, postalCode }))
        props.history.push('/payment')
    }



    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" required placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" required placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" required placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control type="text" required placeholder="Enter PostalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
