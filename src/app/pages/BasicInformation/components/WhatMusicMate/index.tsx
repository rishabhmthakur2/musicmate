import React from 'react'
import { Container, Row, Form, Col } from 'react-bootstrap'

const WhatMusicMate = () => {
    const options = [
        { name: 'Explore gig opportunities', value: 'explore' },
        { name: 'Find jam mates', value: 'findJam' },
        { name: 'Showcase works', value: 'showcase' },
        { name: 'Expand network', value: 'expand' },
    ]
    return (
        <Container className="mt-50 p-0">
            {options.map((item) => (
                <Row className="mb-2">
                    <Col xs="10">
                        <p className="desc-text">{item.name}</p>
                    </Col>
                    <Col xs="2">
                        <Form.Check
                            type={'checkbox'}
                        />
                    </Col>
                </Row>
            ))}
        </Container>
    )
}
export default WhatMusicMate