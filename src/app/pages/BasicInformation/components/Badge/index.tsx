import React from 'react'
import { Col } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';


const BadgeMain =({options})=>{
    return(
        <>
        {options&&options.length>0&&options.map((item) => (
                    <Col>
                        <Badge pill className="pill-wrap mb-3">
                            {item.name}
                        </Badge>
                    </Col>

                ))}
        </>
    )
}
export default BadgeMain