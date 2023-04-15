import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import BIHeader from "./components/BIHeader";
import "./biinfo.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Purpose } from "../../../assets/images/purpose.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";

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
    <div className="auth-main-wrap" style={{ marginTop: "5%" }}>
      <Row>
        <Col xs="12">
          <BIHeader />
        </Col>
        <p
          className="bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0"
          style={{ marginTop: "35px" }}
        >
          <Purpose />
        </p>
      </Row>

      <Form className="mt-40">
        <Form.Group className="mb-1">
          <Form.Label className="auth-title">
            MusicMate offers many. What brings you here?
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="desc-text-sec">
            To protect minors, MusicMate is only open to people aged 18 or
            older. Please confirm your age in order to proceed.
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center mt-40">
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Explore gig opportunities</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="Yes"
                type={"checkbox"}
                checked={selectedOption === "Yes"}
                onChange={handleOptionChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Find Jam Mates</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="No"
                type={"checkbox"}
                checked={selectedOption === "No"}
                onChange={handleOptionChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Showcase Works</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="No"
                type={"checkbox"}
                checked={selectedOption === "No"}
                onChange={handleOptionChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Expand Network</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="No"
                type={"checkbox"}
                checked={selectedOption === "No"}
                onChange={handleOptionChange}
              />
            </Col>
          </Row>
          <Col
            xs="12"
            className="d-flex align-items-center"
            style={{ marginTop: "20px" }}
          >
            <p className="desc-text pe-2">Visible on profile</p>
            <div
              onClick={() => {
                console.log("Clicked");
              }}
            >
              <Eye />
            </div>
          </Col>
          <Row className="mt-40">
            <Col xs="6">
              <Button className="secondary-btn w-auto">
                <ArrowLeft /> Prev
              </Button>
            </Col>
            <Col xs="6" className="d-flex justify-content-end">
              <Button className="primary-btn w-auto">
                Next <ArrowRight />
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default StepOne;
