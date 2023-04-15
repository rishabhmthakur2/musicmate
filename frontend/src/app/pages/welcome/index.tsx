import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as WelcomeImg } from "../../../assets/images/welcome.svg";

const Welcome = (props) => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row>
        <Col xs="12" className="d-flex justify-content-center mt-5 pt-5">
          <WelcomeImg />
        </Col>
        <Col xs="12">
          <p className="main-title mt-5">Welcome!</p>
          <p className="desc-text text-center">
            Let’s kickstart your journey by filling in some basic information
          </p>
        </Col>
        <Col
          xs="12"
          className="d-flex flex-column align-items-center justify-content-center mt-2 "
        >
          <Button
            className="primary-btn"
            style={{ marginTop: "38px" }}
            onClick={() => navigate("/basicinfo")}
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
export default Welcome;
