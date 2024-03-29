import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MainImg } from "../../../assets/images/MM_main.svg";
import "./Home.scss";
const Home = (props) => {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      style={{
        marginTop: "100px",
        paddingLeft: "none",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
      className="justify-content-center align-content-center"
    >
      <Row>
        <Col
          xs="12"
          className="d-flex justify-content-center align-content-center mt-5 pt-5"
        >
          <MainImg />
        </Col>
        <Col xs="12">
          <p className="main-title mt-5">MusicMate</p>
          <p className="desc-text text-center">Where your music career grows</p>
        </Col>
        <Col
          xs="12"
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ marginTop: "30px" }}
        >
          <Button className="secondary-btn" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button
            className="primary-btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
