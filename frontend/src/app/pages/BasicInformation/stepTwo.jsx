import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import BIHeader from "./components/BIHeader";
import "./biinfo.scss";
import { ReactComponent as Location } from "../../../assets/images/loc.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";

const StepTwo = ({ handleNext, handlePrevious }) => {
  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [showOnProfile, setShowOnProfile] = useState(false);

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);
    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const fetchPlace = async (text) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

  const fetchLatLong = async (text) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1IjoicmlzaGFiaG10aGFrdXIyIiwiYSI6ImNsZ2lvNDE5eTB4YXozbHE2NXVtaDI4bXAifQ.Qj2Bl5nqmH6zZYc6RANlJg`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetchLatLong(city);
    if (res) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const location = {
        data: {
          city,
          lat: res.features[0].center[1],
          long: res.features[0].center[0],
        },
        isVisible: showOnProfile,
      };
      userData["location"] = location;
      localStorage.setItem("userData", JSON.stringify(userData));
      handleNext();
    } else {
      alert("Invalid City");
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
          <Location />
        </p>
      </Row>

      <Form className="mt-40">
        <Form.Group className="mb-1">
          <Form.Label className="auth-title">Where are you located?</Form.Label>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="desc-text-sec">
            Enabling location improves discoverability
          </Form.Label>
        </Form.Group>

        <div className="d-flex flex-column justify-content-center mt-40">
          <Form.Group className="mb-4">
            <Form.Label className="auth-label">
              Location (City){" "}
              {autocompleteErr && (
                <span className="inputError">{autocompleteErr}</span>
              )}
            </Form.Label>
            <datalist id="places">
              {autocompleteCities.map((city, i) => (
                <option key={i}>{city}</option>
              ))}
            </datalist>
            <Form.Control
              className="p-2 auth-input-wrap"
              type="text"
              placeholder=""
              onChange={handleCityChange}
              list="places"
              id="city"
              name="city"
              value={city}
              required
              pattern={autocompleteCities.join("|")}
              autoComplete="off"
            />
          </Form.Group>
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
export default StepTwo;
