import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import BadgeMain from '../Badge'

const Skills=()=>{
    const options = [
        { name: 'Acapella' },
        { name: 'Brass' },
        { name: 'Conducting' },
        { name: 'Composition' },
        { name: 'Guitar' },
        { name: 'Music Tech' },
        { name: 'Piano' },
        { name: 'Rearrangement' },
        { name: 'Percussions' },
        { name: 'Strings' },
        { name: 'Transcription' },
        { name: 'Woodwinds' },
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
export default Skills