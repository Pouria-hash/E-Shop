import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'


const Product = ({ product }) => {
    return (
        <div>
            <Card className="my-3 p-2 rounded product">
                <Link to={`/products/${product._id}`}><Card.Img className="card-image" variant="top" src={`${product.image}`} /></Link>
                <Card.Body>
                    <Link to={`/products/${product._id}`}>
                        <Card.Title>{product.name}</Card.Title></Link>
                    <Card.Text>
                        <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as="h3">
                        Price: {product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product