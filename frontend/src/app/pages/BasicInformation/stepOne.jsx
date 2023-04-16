import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import BIHeader from "./components/BIHeader";
import "./biinfo.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Purpose } from "../../../assets/images/purpose.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";

const StepOne = ({ handleNext }) => {
  const [options, setOptions] = useState([]);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setOptions([...options, value]);
    } else {
      setOptions(options.filter((option) => option !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (options.length > 0) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const purpose = {};
      purpose["data"] = options;
      purpose["isVisible"] = showOnProfile;
      userData["purpose"] = purpose;
      localStorage.setItem("userData", JSON.stringify(userData));
      handleNext();
    } else {
      alert("Please select atleast one option");
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
            We will tailor your journey here accordingly
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center mt-40">
          <Row className="mb-2">
            <Col xs="10">
              <p className="desc-text">Explore gig opportunities</p>
            </Col>
            <Col xs="2">
              <Form.Check
                value="Explore gig opportunities"
                type={"checkbox"}
                checked={options.includes("Explore gig opportunities")}
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
                value="Find Jam Mates"
                type={"checkbox"}
                checked={options.includes("Find Jam Mates")}
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
                value="Showcase Works"
                type={"checkbox"}
                checked={options.includes("Showcase Works")}
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
                value="Expand Network"
                type={"checkbox"}
                checked={options.includes("Expand Network")}
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
                setShowOnProfile(!showOnProfile);
              }}
            >
              {!showOnProfile ? <Eye /> : <EyeSelected />}
            </div>
          </Col>
          <Row className="mt-40">
            <Col xs="6">
              {/* <Button className="secondary-btn w-auto">
                <ArrowLeft /> Prev
              </Button> */}
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
export default StepOne;
