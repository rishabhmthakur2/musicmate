import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UploadImg } from "../../../assets/images/upload.svg";

const StepSix = ({ handleNext }) => {
  const navigate = useNavigate();
  return (
    <Container fluid style={{marginTop: "100px"}}>
      <Row>
        <Col xs="12" className="d-flex justify-content-center mt-5 pt-5">
          <UploadImg />
        </Col>
        <Col xs="12">
          <p className="main-title mt-5">Almost Done!</p>
          <p className="desc-text text-center">
            Showcase your work on MusicMate to get discovered!
          </p>
        </Col>
        <Col
          xs="12"
          className="d-flex flex-column align-items-center justify-content-center mt-2 "
        >
          <Button
            className="primary-btn"
            style={{ marginTop: "38px" }}
            onClick={() => {
              navigate("/upload");
            }}
          >
            Continue
          </Button>
          <Button
            className="secondary-btn"
            style={{ marginTop: "16px" }}
            onClick={() => navigate("/")}
          >
            I’ll do this later
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default StepSix;
