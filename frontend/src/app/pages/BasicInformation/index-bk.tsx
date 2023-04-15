import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import BIHeader from "./components/BIHeader";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import Layout from "./components/Layout";

const BasicInformation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };
  return (
    <Container className="auth-main-wrap">
      <Row>
        <Col xs="12">
          <BIHeader />
        </Col>
        <Layout currentStepNumber={currentStep || 0} />
        <Col xs="12" className="d-flex align-items-center mt-75">
          <p className="desc-text pe-2">Visible on profile</p>
          <Eye />
        </Col>
      </Row>
      <Row className="mt-80">
        <Col xs="6">
          <Button
            className="secondary-btn w-auto"
            disabled={currentStep === 0}
            onClick={handlePrev}
          >
            <ArrowLeft /> Prev
          </Button>
        </Col>
        <Col xs="6" className="d-flex justify-content-end">
          <Button
            className="primary-btn w-auto"
            onClick={handleNext}
            disabled={currentStep === 5}
          >
            Next <ArrowRight />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicInformation;
