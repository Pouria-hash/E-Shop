import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Row, Col, Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import { listOrder } from '../actions/orderAction'

const OrderListScreen = (props) => {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)

    const orderList = useSelector(state => state.orderList)
    const { orders, loading, error } = orderList

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrder())
        } else {
            props.history.push('/login')
        }
    }, [dispatch, props, userInfo])





    return loading ? <h5>Loading... </h5> : error ? <Message variant="danger">{error}</Message> : (
        <div>
            <Row className="mb-3">
                <Col>
                    <h1>Order List</h1>
                </Col>
            </Row>
            <Table striped hover responsive className="table-sm text-center">
                <thead>
                    <tr>
                        <th>ROW</th>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>PAIDAT</th>
                        <th>DElIVERD</th>
                        <th>DElIVERDAT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id} className="align-middle">
                            <td>{orders.indexOf(order) + 1}</td>
                            <td>{order._id}</td>
                            <td>{order.user.username}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            }</td>
                            <td>{order.paidAt && order.paidAt.substring(0, 10)}</td>
                            <td>{order.isDelivered ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>}</td>
                            <td>{order.deliveredAt && order.deliveredAt.substring(0, 10)}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className="btn btn-info btn-sm">
                                        Detail
                                    </Button>
                                </LinkContainer>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )


}

export default OrderListScreen
