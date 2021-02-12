import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = (props) => {
    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            props.history.push(`/search/${keyword}`)
        } else {
            props.history.push('/products')
        }
    }
    return (
        <div>
            <Form onSubmit={searchHandler} className="d-flex flex-row">
                <input type="text" className="form-control mx-2" name="q" placeholder="Search..." onChange={e => setKeyword(e.target.value)} />
                <Button type="submit" className="btn btn-success">Search</Button>
            </Form>
        </div>
    )
}

export default SearchBox
