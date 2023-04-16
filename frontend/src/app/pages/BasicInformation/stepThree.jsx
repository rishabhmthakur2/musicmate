import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import BIHeader from "./components/BIHeader";
import "./biinfo.scss";
import { ReactComponent as Genres } from "../../../assets/images/genres.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";
import BadgeMain from "./components/Badge";
import { Badge } from "react-bootstrap";

const StepThree = ({ handleNext, handlePrevious }) => {
  const [options, setOptions] = useState([
    { name: "Bossa Nova", selected: false },
    { name: "Classical", selected: false },
    { name: "Country", selected: false },
    { name: "Electronic", selected: false },
    { name: "Hip-hop", selected: false },
    { name: "Jazz", selected: false },
    { name: "Pop", selected: false },
    { name: "R&B", selected: false },
    { name: "Rock", selected: false },
    { name: "Soundtrack", selected: false },
    { name: "Alternatives", selected: false },
  ]);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedOptions = options.filter((option) => option.selected);
    const selectedOptionNames = selectedOptions.map((option) => option.name);
    if (selectedOptionNames.length > 0) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const genres = {
        data: selectedOptionNames,
        isVisible: showOnProfile,
      };
      userData["genres"] = genres;
      localStorage.setItem("userData", JSON.stringify(userData));
      handleNext();
    } else {
      alert("Please select atleast one option!");
    }
  };

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
          <Genres />
        </p>
      </Row>

      <Form className="mt-40">
        <Form.Group className="mb-1">
          <Form.Label className="auth-title">
            What genre(s) vibe with you the most?
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="desc-text-sec">
            We will connect you with kindred musicians
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center">
          <Container className="p-0">
            <Row className="mb-2 d-flex">
              <BadgeMain options={options} setOptions={setOptions} />
              <Col xs="12">
                <Button className="w-100 mt-2 addMoreBtn"> + Add More</Button>
              </Col>
            </Row>
          </Container>
          <Col
            xs="12"
            className="d-flex align-items-center"
            style={{ marginTop: "20px" }}
          >
            <p className="desc-text pe-2">Visible on profile</p>
            <div
              onClick={() => {
                setShowOnProfile(!showOnProfile);
              }}
            >
              {!showOnProfile ? <Eye /> : <EyeSelected />}
            </div>
          </Col>
          <Row className="mt-40">
            <Col xs="6">
              <Button className="secondary-btn w-auto" onClick={handlePrevious}>
                <ArrowLeft /> Prev
              </Button>
            </Col>
            <Col xs="6" className="d-flex justify-content-end">
              <Button className="primary-btn w-auto" onClick={handleSubmit}>
                Next <ArrowRight />
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default StepThree;
