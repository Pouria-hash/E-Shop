import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { listProduct } from '../actions/productAction'
import Product from '../components/Product'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import CarouselTopProduct from '../components/CarouselTopProduct'
import Meta from '../components/Meta'


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pagenum
    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const { loading, error, products, page, pages } = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber))
        // const fetchData = async () => {
        //     const res = await axios.get('/api/products')
        //     setProduct(res.data)
        // }
        // fetchData()
    }, [dispatch, keyword, pageNumber])

    return (
        <div>
            {!keyword ? <CarouselTopProduct /> : <Link to="/products" className="btn btn-light">Go Back</Link>}
            {loading ? (<h3>Loading ...</h3>) : error ? <Message variant="danger">{error}</Message> : (
                <div>
                    <Meta />
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
            )}
        </div>
    )
}

export default HomeScreen
