import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { userRegister } from '../actions/userAction'
import FormContainer from '../components/FormContainer'


const RegisterScreen = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const { error, loading, userInfo } = useSelector(state => state.userRegister)

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/products'
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        if (!username || !password || !email) {
            setMessage('Invalid data')
        } else {
            dispatch(userRegister(username, password, email))
        }
    }

    return (
        <div>
            <FormContainer headForm="Register">
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && "Loading ..."}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                                 </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
            </FormContainer>
        </div>
    )
}

export default RegisterScreen