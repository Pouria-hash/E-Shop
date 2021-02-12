import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { detailProduct, createReview } from '../actions/productAction'
import Message from '../components/Message'
import Meta from '../components/Meta'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState([1])
    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const { loading, error, product } = useSelector(state => state.productDetail)

    const { error: createReviewError, success: createReviewSuccess } = useSelector(state => state.productCreateReview)

    const productId = match.params.id
    useEffect(() => {
        if (createReviewSuccess) {
            setRate(0)
            setComment('')
            dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" })
        }
        dispatch(detailProduct(match.params.id))

    }, [dispatch, createReviewSuccess, match])



    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createReview(productId, { rate, comment }))
    }
    return (
        <div>
            <Meta title={product.name} />
            <Link to="/products" className="btn btn-info mb-3">Back To Products</Link>
            {loading ? <h3>Loading ...</h3> : error ? <Message variant="danger">{error}</Message> :
                <div>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>{product.name}</ListGroup.Item>
                                <ListGroup.Item>
                                    Rate: <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item><b>Price:</b> ${product.price}</ListGroup.Item>
                                <ListGroup.Item><b>Description:</b> {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <Card>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>{product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : "Out of Stock"}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>QTY</Col>
                                                <Col>
                                                    <Form.Control as="select" onChange={e => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>

                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn btn-info btn-block'
                                            disabled={product.countInStock === 0}>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </Card>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row className='justify-content-between mt-3'>
                        {createReviewError && <Message variant='danger'>{createReviewError}</Message>}
                        {createReviewSuccess && <Message variant='success'>Review successfully added</Message>}

                        <Col md={5}>
                            {userInfo && (
                                <div>
                                    <h3>Leave Review</h3>
                                    <form onSubmit={submitReviewHandler}>
                                        <label for="rate">Rate:</label>
                                        <select className='form-control mb-2' value={rate} onChange={e => setRate(e.target.value)}>
                                            <option value="">--select--</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </select>

                                        <textarea
                                            className="form-control mb-2"
                                            placeholder="Leave comment"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                        ></textarea>
                                        <Button className="btn btn-success" type="submit">submit</Button>
                                    </form>
                                </div>
                            )}
                        </Col>

                        <Col md={5} className="card p-3">
                            <h3>Reviews</h3>
                            {product.reviews.length === 0 ? <message>No reviews</message> : (
                                <ListGroup variant="flush">
                                    {product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <Rating rating={review.rate} text={review.author.username} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            {review.comment && <p>{review.comment}</p>}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}

export default ProductScreen