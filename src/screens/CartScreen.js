import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import { addToCart, deleteFromCart } from '../actions/cartAction'
import Message from '../components/Message'


const CartScreen = (props) => {
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const productId = props.match.params.id

    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)


    useEffect(() => {
        if (productId && qty) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const deleteItemHandler = (id) => {
        dispatch(deleteFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    <Message>
                        Cart is Empty <Link to="/products">Go back to Products</Link>
                    </Message>
                    : <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={e =>
                                            dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant='light' onClick={() => deleteItemHandler(item.product)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </Button>
                                    </Col>


                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h5>Total Items : {cartItems.reduce((acc, item) => acc + item.qty, 0)}</h5>
                            <p>Total Price: ${cartItems.reduce((acc, item) => (acc + item.qty * item.price), 0).toFixed(2)}</p>
                        </ListGroup.Item>
                        <ListGroup.Item className='text-center'>
                            <Button
                                className="btn btn-info"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}>
                                Process to checkout
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen
