import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Row, Col, Table, Form, Button, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import { listProduct, deleteProduct } from '../actions/productAction'
import Paginate from '../components/Paginate'

const ProductListScreen = (props) => {
    const pageNumber = props.match.params.pagenum
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)

    const productList = useSelector(state => state.productList)
    const { products, page, pages, loading, error } = productList

    const { success: successDelete, error: errorDelete, loading: loadingDelete } = useSelector(state => state.productDelete)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProduct('', pageNumber))
        } else {
            props.history.push('/login')
        }
    }, [dispatch, props, userInfo, successDelete])

    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteProduct(productId))
        }
    }


    return loading ? <h5>Loading... </h5> : error ? <Message variant="danger">{error}</Message> : (
        <div>
            <Row className="mb-3">
                <Col>
                    <h1>Product List</h1>
                </Col>
                <Col className="text-end">
                    <Link to="/admin/products/new" className="btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg> Add Product</Link>
                </Col>
            </Row>
            {loadingDelete && <h5>Loading...</h5>}
            {successDelete && <Message variant="success">successfully deleted</Message>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            <Table striped hover responsive className="table-sm text-center">
                <thead>
                    <tr>
                        <th>ROW</th>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id} className="align-middle">
                            <td>{products.indexOf(product) + 1}</td>
                            <td>{product._id}</td>
                            <td><Link to={`/products/${product._id}`}>{product.name}</Link></td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>${product.price}</td>
                            <td>{product.countInStock}</td>
                            <td>
                                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                    <Button className="btn btn-success btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Button>
                                </LinkContainer>
                                <Button className="btn btn-danger btn-sm" onClick={() => deleteHandler(product._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <Paginate page={page} pages={pages} isAdmin={true} />
        </div>
    )


}

export default ProductListScreen
