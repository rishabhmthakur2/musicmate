import React from "react";
import { Container, Row, Form, Col } from "react-bootstrap";

const Rating = () => {
  const options = [
    { name: "Beginner", value: "beginner" },
    { name: "Intermediate", value: "intermediate" },
    { name: "Advanced", value: "advanced" },
    { name: "Expert", value: "expert" },
  ];
  return (
    <Container className="mt-50 p-0">
      {options.map((item) => (
        <Row className="mb-2">
          <Col xs="10">
            <p className="desc-text">{item.name}</p>
          </Col>
          <Col xs="2">
            <Form.Check value={item.value} type={"radio"} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};
export default Rating;
