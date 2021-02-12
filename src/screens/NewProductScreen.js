import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { addProduct } from '../actions/productAction'
import Loading from '../components/Loading'


const NewProductScreen = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [uploading, setUploading] = useState(false)
    const [category, setCategory] = useState("Electronics")
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const { success, loading, error } = useSelector(state => state.productAdd)

    useEffect(() => {
        if (success) {
            dispatch({ type: "PRODUCT_ADD_RESET" })
            props.history.push('/admin/productlist')
        }
    }, [success, props, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (image) {
            dispatch(addProduct({ name, image, price, category, countInStock, description, brand }))
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)

            setUploading(false)
            previewFile(file)
        } catch (error) {
            console.log(error)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreviewSource(reader.result)
        }
    }

    return (
        <div>
            <Link to="/admin/productlist" className="btn btn-light"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg> Back to Product List</Link>
            {loading ? <h5>Loading...</h5> : error ? <Message variant="danger">{error}</Message> : (
                <FormContainer>
                    <h1>New Product</h1>
                    <Form onSubmit={submitHandler} >

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <select className="form-select">
                                <option value="Electronics" onChange={e => setCategory(e.target.value)}>Electronics</option>
                            </select>
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter Image url" value={image} onChange={(e) => setImage(e.target.value)} />
                            <input type="file" className="form-control" onChange={uploadFileHandler} />
                            {uploading && <Loading className="mt-3" />}
                            {previewSource && (
                                <img src={previewSource} className="img-fluid rounded mt-1" style={{ width: "100px" }} />
                            )}
                        </Form.Group>


                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="number" placeholder="Enter count in stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <textarea className="form-control" placeholder="Enter price" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </FormContainer>
            )}

        </div>
    )
}

export default NewProductScreen
