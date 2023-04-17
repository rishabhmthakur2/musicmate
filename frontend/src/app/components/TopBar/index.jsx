import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchBar from "../SearchBar";
import NavLogo from "../../../assets/images/navLogo.svg";
import Message from "../../../assets/images/message.svg";
import "./navBar.scss";

function TopNavBar() {
  return (
    <div className="TopNavBar">
      <img className="logo" src={NavLogo} alt="Logo" />
      <SearchBar />
      <img className="profile-icon" src={Message} alt="Message" />
    </div>
  );
}

export default TopNavBar;
