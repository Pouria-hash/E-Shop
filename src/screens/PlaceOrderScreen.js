import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderAction'


const PlaceOrderScreen = (props) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)


    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    cart.shippingPrice = cart.itemsPrice > 100 ? 0.00 : 100.00;

    cart.taxPrice = (Number(cart.itemsPrice) * 0.09).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { error, success, order } = orderCreate

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`)
        }
    }, [history, order, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            paymentMethod: cart.paymentMethod,
            shippingAddress: cart.shippingAddress
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">

                        <ListGroup.Item>
                            <h3>shiping</h3>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address} , {cart.shippingAddress.city} ,
                                {cart.shippingAddress.postalCode} , {cart.shippingAddress.state}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>

                            {cart.cartItems.length === 0 ? <Message variant="danger">Cart items is empty</Message> :
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} className="img-fluid" />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    <p>{item.qty}  *  {item.price}  =  {item.qty * item.price}</p>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup variant="flush" className="card">
                        <ListGroup.Item className="text-center">
                            <h2>order summery</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items: </Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {error ? <Message variant="danger">{error}</Message> : ''}
                        <ListGroup.Item>
                            <Button className="btn btn-primary btn-block" onClick={placeOrderHandler}
                                disabled={cart.cartItems === 0}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
