import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import Message from '../components/Message'
import { getOrderDetails, payOrderAction, deliverOrder } from '../actions/orderAction'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Loading from '../components/Loading'


const OrderScreen = (props) => {
    const orderId = props.match.params.id

    const [sdkReady, setSdkReady] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)

    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const { error, order, loading } = orderDetails

    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { error: errorDeliver, success: successDeliver, loading: loadingDeliver } = orderDeliver

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)
    }



    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!userInfo) {
            props.history.push('/login')
        } else if (!order || successPay || orderId !== order._id || successDeliver) {
            dispatch({ type: "ORDER_PAY_RESET" })
            dispatch({ type: "ORDER_DELIVER_RESET" })
            dispatch({ type: "CART_PAY_RESET" })
            dispatch(getOrderDetails(orderId))
        } else if (!order.paid) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }, [dispatch, order, orderId, successPay, successDeliver, props])



    const successPayHandler = (paymentResult) => {
        dispatch(payOrderAction(orderId, paymentResult))
    }

    const deliverHandler = async (orderId) => {
        dispatch(deliverOrder(orderId))
    }

    return loading ? "Loading ... " :
        <div>
            <Row>
                <Col md={8}>
                    <h1>order {order._id}</h1>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>shiping</h3>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address} , {order.shippingAddress.city} ,
                        {order.shippingAddress.postalCode} , {order.shippingAddress.state}
                            </p>
                            <p>{order.isDelivered ? <Message variant="success">Order is deliverd at {order.deliveredAt}</Message> : <Message variant="danger">Order is not deliverd</Message>}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            <p>{order.paymentMethod}</p>
                            <p>{order.isPaid ? <Message variant="success">Order is paid at {order.paidAt}</Message> : <Message variant="danger">Order is not paid</Message>}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>

                            {order.orderItems.length === 0 ? <Message variant="danger">Order items is empty</Message> :
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && userInfo && order.user._id === userInfo._id && <ListGroup.Item>
                            {loadingPay ? "Loading ..." :
                                <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPayHandler}
                                />}
                        </ListGroup.Item>}
                        {order.isPaid && userInfo && userInfo.isAdmin && !order.isDelivered &&
                            <ListGroup.Item>
                                <Row>
                                    <Col>Order Deliverd:</Col>
                                    <Col>
                                        <Button className="btn btn-success btn-sm" onClick={() => deliverHandler(order._id)}>Deliverd</Button>
                                    </Col>
                                    {loadingDeliver && <Loading />}
                                </Row>
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Col>
            </Row>
        </div>
}



export default OrderScreen
