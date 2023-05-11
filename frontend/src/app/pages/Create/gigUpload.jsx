import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Form, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Purpose } from "../../../assets/images/createPost.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeSelected } from "../../../assets/images/eye-selected.svg";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as Camera } from "../../../assets/icons/camera.svg";
import Popup from "app/components/Popup";
import axios from "axios";
import AutocompleteDropdown from "app/components/AutocompleteDropdown";

import NavBar from "app/components/NavBar";
import Dropdown from "app/components/Dropdown";
import "./post.scss";

const GigUpload = ({ back }) => {
  const [postLength, setPostLength] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmpType, setSelectedEmpType] = useState("");
  const [selectedSkillType, setSelectedSkillType] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

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

  //   const fetchLatLong = async (text) => {
  //     try {
  //       const res = await fetch(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAP_PK}`
  //       );
  //       if (!res.ok) throw new Error(res.statusText);
  //       return res.json();
  //     } catch (err) {
  //       return { error: "Unable to retrieve places" };
  //     }
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const res = await fetchLatLong(city);
  //     if (res) {
  //       const userData = JSON.parse(localStorage.getItem("userData"));
  //       const location = {
  //         data: {
  //           city,
  //           lat: res.features[0].center[1],
  //           long: res.features[0].center[0],
  //         },
  //         isVisible: showOnProfile,
  //       };
  //       userData["location"] = location;
  //       localStorage.setItem("userData", JSON.stringify(userData));
  //       handleNext();
  //     } else {
  //       alert("Invalid City");
  //     }
  //   };

  const [options, setOptions] = useState([
    "Bossa Nova",
    "Classical",
    "Country",
    "Electronic",
    "Hip-hop",
    "Jazz",
    "Pop",
    "R&B",
    "Rock",
    "Soundtrack",
    "Alternatives",
  ]);
  const [skillOptions, setSkillOptions] = useState([
    "Brass",
    "Conducting",
    "Composition",
    "Music Tech",
    "Piano",
    "Rearrangement",
    "Percussions",
    "Strings",
    "Transcription",
    "Woodwinds",
  ]);
  const experienceOptions = [
    "Beginner",
    "Intermediate",
    "Skilled",
    "Professional",
  ];
  const employmentOptions = ["Full time", "Part time", "One time"];
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (description.length > 0) {
      setPostLength(description.length);
    }
  }, [description]);

  const postData = async () => {
    if (postLength < 1000) {
      try {
        const postCallData = await axios.post("http://localhost:8000/gigs", {
          UserId: JSON.parse(localStorage.getItem("loggedUser"))._id,
          Name: title,
          LocationName: city,
          Skills: selectedSkills,
          GigType: selectedEmpType,
          RequiredProficiency: selectedSkillType,
          Description: description,
          CompanyName: company,
        });
        if (postCallData.status === 200) {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            back();
          }, 3000);
        }
      } catch (e) {
        console.log("Something went wrong");
      }
    } else {
      alert("Exceeded character length");
    }
  };

  return (
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
        </Row>

        <Form className="mt-40">
          <Form.Group className="mb-1">
            <Form.Label className="body-heading">
              Let's post your gig
            </Form.Label>
          </Form.Group>

          <div className="d-flex flex-column justify-content-center mt-10">
            <Form.Group className="mb-4 mt-4">
              <Form.Label className="desc-text">
                Title <span style={{ color: "#3A86FF" }}>(required)</span>
              </Form.Label>
              <Form.Control
                className=" p-2 auth-input-wrap"
                type="text"
                value={title}
                placeholder=""
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
            <AutocompleteDropdown
              options={skillOptions}
              selectedGenres={selectedSkills}
              setSelectedGenres={setSelectedSkills}
              title={"Skills"}
              placeholder="e.g. Piano or Strings"
            />
            <div className="d-flex flex-column justify-content-center">
              <Form.Group className="mb-4">
                <Form.Label className="desc-text">
                  Employment Type{" "}
                  <span style={{ color: "#3A86FF" }}>(required)</span>
                </Form.Label>
                <Dropdown
                  options={employmentOptions}
                  selectedOption={selectedEmpType}
                  setSelectedOption={setSelectedEmpType}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-4">
                <Form.Label className="auth-label">
                  Location (City){" "}
                  {autocompleteErr && (
                    <span className="inputError">{autocompleteErr}</span>
                  )}
                  <span style={{ color: "#3A86FF" }}>(required)</span>
                </Form.Label>
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
                <datalist id="places">
                  {autocompleteCities.map((city, i) => {
                    return <option id={i}>{city}</option>;
                  })}
                </datalist>
              </Form.Group>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <Form.Group className="mb-4">
                <Form.Label className="desc-text">Experience Level </Form.Label>
                <Dropdown
                  options={experienceOptions}
                  selectedOption={selectedSkillType}
                  setSelectedOption={setSelectedSkillType}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-4">
              <Form.Label className="desc-text">
                Company/Organization
              </Form.Label>
              <Form.Control
                className=" p-2 auth-input-wrap"
                type="text"
                value={company}
                placeholder=""
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
            </Form.Group>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginTop: "2px" }}
            >
              <Form.Group>
                <Form.Label className="desc-text">Description</Form.Label>
                <Form.Control
                  className="p-2 auth-input-wrap"
                  as="textarea"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div
                className="d-flex flex-row align-items-center justify-items-center mb-4 mt-1"
                style={{ justifyContent: "space-between" }}
              >
                <p
                  className="d-flex flex-row align-items-center justify-items-center"
                  style={{ color: "#3A86FF" }}
                ></p>{" "}
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "17px",
                    textAlign: "right",
                    color: "#9B9B9B",
                  }}
                >
                  {postLength}/1,000
                </p>
              </div>
            </div>
            {/* <Col
              xs="12"
              className="d-flex align-items-center"
              style={{ marginTop: "40px" }}
            >
              <p className="desc-text pe-2">Visible on profile</p>
              <div
                onClick={() => {
                  setShowOnProfile(!showOnProfile);
                }}
              >
                {!showOnProfile ? <Eye /> : <EyeSelected />}
              </div>
            </Col> */}
            <Row style={{ marginTop: "20px" }}>
              <Col
                xs="12"
                className="d-flex flex-column align-items-center justify-content-center mt-2 "
              >
                <Button
                  className="primary-btn"
                  disabled={title === "" || selectedEmpType === ""}
                  onClick={postData}
                >
                  Post
                </Button>
                <Button className="secondary-btn mt-3" onClick={() => back()}>
                  Back
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
      <NavBar />
      {showPopup && (
        <Popup message="Your gig has been posted!" onClose={handleClosePopup} />
      )}
    </>
  );
};
export default GigUpload;
