import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";

import AuthHeader from "../Components/AuthHeader";
import "../auth.scss";
import { useNavigate } from "react-router-dom";

const StepOne = ({ handleNext }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    selectedOption === "Yes" && handleNext();
  };
  const navigate = useNavigate();
  return (
    <div className="auth-main-wrap" style={{marginTop: "120px"}}>
      <AuthHeader />
        <Form className="mt-40">
          <Form.Group className="mb-1">
            <Form.Label className="auth-title">
              Are you 18 years or older?
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="desc-text">
              To protect minors, MusicMate is only open to people aged 18 or
              older. Please confirm your age in order to proceed.
            </Form.Label>
          </Form.Group>

          <div className="d-flex flex-column justify-content-center mt-40 ">
            <Row className="mb-2">
              <Col xs="10">
                <p className="desc-text">I am 18 / over 18</p>
              </Col>
              <Col xs="2">
                <Form.Check
                  value="Yes"
                  type={"radio"}
                  checked={selectedOption === "Yes"}
                  onChange={handleOptionChange}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs="10">
                <p className="desc-text">I am under 18</p>
              </Col>
              <Col xs="2">
                <Form.Check
                  value="No"
                  type={"radio"}
                  checked={selectedOption === "No"}
                  onChange={handleOptionChange}
                />
              </Col>
            </Row>
            <Button
              className="primary-btn"
              style={{ marginTop: "48px" }}
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </div>
        </Form>
    </div>
  );
};
export default StepOne;
