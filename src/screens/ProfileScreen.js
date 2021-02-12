import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Table, Container, Form, Button, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import { getUserDetails, updateProfile } from '../actions/userAction'
import { getUserOrders } from '../actions/orderAction'



const ProfileScreen = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const { error, loading, user } = useSelector(state => state.userDetail)

    const { userInfo } = useSelector(state => state.userLogin)

    const { success } = useSelector(state => state.userUpdateProfile)

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login')
        } if (!user.username) {
            dispatch(getUserOrders())
            dispatch(getUserDetails())
        } else {
            setUsername(user.username)
            setEmail(user.email)
            setAddress(user.address)

        }
    }, [dispatch, history, user, userInfo])


    const { error: errorOrders, loading: loadingOrders, orders } = useSelector(state => state.userOrders)



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ username, email, address }))

    }

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2>Profile</h2>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success">Profile Updated</Message>}
                    {loading && "Loading ..."}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your information with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>



                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                            </Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            Have an account?
                                  <Link to="/api/user/login"> Login</Link>
                        </Col>
                    </Row>

                </Col>
                <Col md={9}>
                    <h3>Order List</h3>
                    {loadingOrders ? "Loading ..." : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
                        <ListGroup variant="flush">

                            <Table striped hover responsive className="table-sm table text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th>DETAIL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
                                                    <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                </svg>
                                            }</td>
                                            <td>{order.isDelivered ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            }</td>
                                            <td>{<Link to={`/order/${order._id}`}>Detail</Link>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </ListGroup>
                    }

                </Col>
            </Row>
        </div>
    )
}

export default ProfileScreen