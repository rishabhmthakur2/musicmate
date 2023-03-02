import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import '../../biinfo.scss'
import BadgeMain from '../Badge';

const Generes = () => {
    const options = [
        { name: 'Bossa Nova' },
        { name: 'Classical' },
        { name: 'Country' },
        { name: 'Electronic' },
        { name: 'Hip-hop' },
        { name: 'Jazz' },
        { name: 'Pop' },
        { name: 'R&B' },
        { name: 'Rock' },
        { name: 'Soundtrack' },
        { name: 'Alternatives' },
    ]
    return (
        <Container className="mt-50 p-0">
            <Row className="mb-2 d-flex">
                <BadgeMain options={options} />
                <Col xs="12">
                    <Button className='w-100 mt-5 addMoreBtn'> + Add More</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default Generes