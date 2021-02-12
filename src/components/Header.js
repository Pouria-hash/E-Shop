import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Route } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userLogout } from '../actions/userAction'
import SearchBox from './SearchBox'

export const Header = (props) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(userLogout())

    }

    return (
        <header>

            <Navbar className="navbar" bg="dark" expand="md" sticky='top' variant="dark" CollapseOnSelect>
                <div className="container">
                    <LinkContainer to='/products'>
                        <Navbar.Brand >E-Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={(props) => <SearchBox history={props.history} />} />
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo
                                ? (
                                    <NavDropdown className="mx-0" title={userInfo.username} id="username">
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                <div className="d-md-flex flex-md-row">
                                    <LinkContainer to='/login'>
                                        <Nav.Link><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg> Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>
                                </div>
                            }

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="admin" className="mx-0">
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>User List</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Product List</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Order List</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>

        </header>
    )
}
