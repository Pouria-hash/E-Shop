import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { userLogin } from '../actions/userAction'
import FormContainer from '../components/FormContainer'



const LoginScreen = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { error, loading, userInfo } = useSelector(state => state.userLogin)

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/products'
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(username, password))
    }

    return (
        <div>

            <FormContainer >
                {error && <Message variant="danger">{error}</Message>}
                {loading && "Loading ..."}
                <h1>Sign In Form</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer?
                <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginScreen
