import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";

import AuthHeader from "../Components/AuthHeader";
import "../auth.scss";

const StepTwo = ({ handleNext, handlePrevious }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    userData["nameType"] = selectedOption;
    localStorage.setItem("userData", JSON.stringify(userData));
    handleNext();
  };
  return (
    <div className="auth-main-wrap" style={{marginTop: "120px"}}>
      <AuthHeader />
      <Form className="mt-40">
        <Form.Group className="mb-1">
          <Form.Label className="auth-title">
            First thing's first, names
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="desc-text">
            How would you like to be known to others on MusicMate?
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center mt-40 ">
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Full Name</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="Full Name"
                type={"radio"}
                checked={selectedOption === "Full Name"}
                onChange={handleOptionChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Stage Name</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="Stage Name"
                type={"radio"}
                checked={selectedOption === "Stage Name"}
                onChange={handleOptionChange}
              />
            </Col>
          </Row>
          <p className="tnc-text" style={{ marginTop: "48px" }}>
            Note: don't fret! If you change your mind later, you can update your
            display name via setup.
          </p>
          <Button
            className="primary-btn"
            style={{ marginTop: "18px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </Button>
          <Button
            className="secondary-btn"
            style={{ marginTop: "12px" }}
            type="submit"
            onClick={handlePrevious}
          >
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default StepTwo;
