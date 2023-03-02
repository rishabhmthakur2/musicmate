import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ReactComponent as Close } from '../../../../../assets/images/close.svg'
import '../../biinfo.scss'

const BIHeader = () => {
    return (
        <Container>
            <Row>
                <Col xs="10">
                    <p className='bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0'>
                        MusicMate
                    </p>
                </Col>
                <Col xs="2" className='d-flex justify-content-end align-items-center'>
                    <Close/>
                </Col>
            </Row>
        </Container>
    )
}
export default BIHeader