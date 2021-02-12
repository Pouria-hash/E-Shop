import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

const FormContainer = (props) => {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="col-md-6">
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
