import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap'

const NotificationToggle = () => {
    return (
        <Container className='mt-4'>
            <Row >
                <Col xs="12" className='d-flex justify-content-center p-0'>
                    <Button className='secondary-btn w-100'   >
                        Enable Notifications
                    </Button>
                </Col>
                <Col xs="12" className='d-flex justify-content-center mt-2 p-0'>
                    <Button className='primary-btn w-100' >
                        Disable Notifications
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
export default NotificationToggle