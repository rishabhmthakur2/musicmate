import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Purpose } from "../../../assets/images/createPost.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import NavBar from "app/components/NavBar";
import PostUpload from "./postUpload";
import GigUpload from "./gigUpload";

const Create = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("Gig opportunity");
  const [isHome, setIsHome] = useState(true);
  const [isPostUpload, setIsPostUpload] = useState(false);
  const [isGigUpload, setIsGigUpload] = useState(false);
  const handleSubmit = () => {
    if (option === "Outreach / music life update") {
      setIsHome(false);
      setIsPostUpload(true);
    } else if (option === "Gig opportunity") {
      setIsHome(false);
      setIsGigUpload(true);
    }
  };
  const goBack = () => {
    setIsHome(true);
    setIsPostUpload(false);
    setIsGigUpload(false);
  };
  return (
    <>
      {isHome && (
        <>
          <div
            className="auth-main-wrap"
            style={{ padding: "40px 35px", marginBottom: "72px" }}
          >
            <Row>
              <Col xs="12">
                <Container>
                  <Row>
                    <p className="bi-title text-center d-flex justify-content-center align-items-center pb-0 mb-0">
                      <Logo />
                    </p>
                  </Row>
                </Container>
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
                <Form.Label className="sec-title-left">
                  What kind of content do you want to post?
                </Form.Label>
              </Form.Group>

              <div className="d-flex flex-column justify-content-center mt-40">
                <Row className="mb-2">
                  <Col xs="10">
                    <p className="desc-text">Outreach / music life update</p>
                  </Col>
                  <Col xs="2">
                    <Form.Check
                      value="Outreach / music life update"
                      type={"radio"}
                      checked={option === "Outreach / music life update"}
                      onChange={(e) => {
                        setOption(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs="10">
                    <p className="desc-text">New portfolio item</p>
                  </Col>
                  <Col xs="2">
                    <Form.Check
                      value="New portfolio item"
                      type={"radio"}
                      checked={option === "New portfolio item"}
                      onChange={(e) => {
                        setOption(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs="10">
                    <p className="desc-text">Gig opportunity</p>
                  </Col>
                  <Col xs="2">
                    <Form.Check
                      value="Gig opportunity"
                      type={"radio"}
                      checked={option === "Gig opportunity"}
                      onChange={(e) => {
                        setOption(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-40">
                  <Col
                    xs="12"
                    className="d-flex flex-column align-items-center justify-content-center mt-2 "
                  >
                    <Button className="primary-btn" onClick={handleSubmit}>
                      Next
                    </Button>
                    <Button
                      className="secondary-btn mt-3"
                      onClick={() => {
                        navigate("/landing");
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
        </>
      )}
      {isPostUpload && <PostUpload back={goBack} />}
      {isGigUpload && <GigUpload back={goBack} />}
      <NavBar />
    </>
  );
};
export default Create;
