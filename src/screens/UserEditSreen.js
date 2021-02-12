import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Table, Container, Form, Button, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getAdminUserDetails, adminUserUpdate } from '../actions/userAction'


const UserEditSreen = (props) => {
    const userId = props.match.params.id

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const { error, loading, user } = useSelector(state => state.userAdminDetails)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = useSelector(state => state.userAdminUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: "USER_ADMIN_UPDATE_RESET" })
            props.history.push('/admin/userlist')
        } else {
            if (!user.username || user._id !== userId) {
                dispatch(getAdminUserDetails(userId))
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setFullName(user.fullName)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, userId, user, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUserUpdate(userId, { username, fullName, isAdmin, email }))
    }

    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light'>back to user list</Link>
            <FormContainer>
                <h1>edit user</h1>
                {loading ? <h3>Loading...</h3> :
                    error ? <Message variant="danger">{error}</Message> :
                        loadingUpdate ? <h3>Loading...</h3> :
                            errorUpdate ? <Message variant="danger">{errorUpdate}</Message> :
                                successUpdate ? <Message variant="success">successfully update</Message> :
                                    (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="formBasicUsername">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group controlId="fullName">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </Form.Group>

                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox" checked={isAdmin} id="isAdmin" onChange={e => setIsAdmin(e.target.checked)} />
                                                <label className="form-check-label" for="isAdmin">
                                                    IsAmin
                            </label>
                                            </div>


                                            <Button variant="primary" type="submit">
                                                Submit
                       </Button>
                                        </Form>

                                    )}

            </FormContainer>
        </div>
    )
}

export default UserEditSreen
