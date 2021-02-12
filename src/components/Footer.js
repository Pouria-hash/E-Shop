import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


export const Footer = () => {
    return (
        <footer className="mt-auto">
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; EShop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
