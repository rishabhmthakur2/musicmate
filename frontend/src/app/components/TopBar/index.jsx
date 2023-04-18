import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../SearchBar";
import NavLogo from "../../../assets/images/navLogo.svg";
import Message from "../../../assets/images/message.svg";
import "./navBar.scss";
import { useNavigate } from "react-router-dom";

function TopNavBar() {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      className="TopNavBar"
      style={{
        position: "relative",
        top: "0px",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <img
        className="logo"
        src={NavLogo}
        alt="Logo"
        onClick={() => {
          navigate("/landing˝");
        }}
      />
      <SearchBar />
      <img
        className="profile-icon"
        src={Message}
        alt="Message"
        onClick={() => {
          navigate("/messages");
        }}
      />
    </Container>
  );
}

export default TopNavBar;
