import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { topRateProduct } from '../actions/productAction'
import Loading from './Loading'
import Message from './Message'

const CarouselTopProduct = () => {
    const dispatch = useDispatch();

    const productTopRate = useSelector(state => state.productTopRate);
    const { products, error, loading } = productTopRate;

    useEffect(() => {
        dispatch(topRateProduct())
    }, [dispatch])

    return loading ? <Loading /> : error ? <Message variant="danger">{error}</Message> : (
        <Carousel fade={true} pause="hover" className='carousel bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <img src={product.image} className="img-fluid" alt={product.name} />
                        <Carousel.Caption className="carousel-caption">
                            <h3>{product.name} (${product.price})</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default CarouselTopProduct
