import React, { useState, useEffect } from "react";
// import "./navbar.scss";
import { ReactComponent as Home } from "../../../assets/icons/home.svg";
import { ReactComponent as BookmarkIcon } from "../../../assets/icons/bookmarks.svg";
import { ReactComponent as NewPost } from "../../../assets/icons/post.svg";
import { ReactComponent as Gigs } from "../../../assets/icons/gigs.svg";
import { ReactComponent as Profile } from "../../../assets/icons/profile.svg";
import { Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedUser"));
    if (userData._id) {
      setUserId(userData._id);
    } else {
      console.log("Something went wrong");
    }
  });
  return (
    <Container
      fluid
      style={{
        position: "fixed",
        bottom: "0px",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Row
        style={{
          backgroundColor: "#9CC2FF",
          height: "72px",
          display: "flex",
          flexDirection: "row",
          maxWidth: "100vw",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-evenly",
          paddingLeft: "10px",
        }}
      >
        <Col xs={2}>
          <Home onClick={() => navigate("/landing")} />
        </Col>
        <Col xs={2}>
          <BookmarkIcon onClick={() => navigate("/bookmarks")} />
        </Col>
        <Col xs={2}>
          <NewPost onClick={() => navigate(`/create`)} />
        </Col>
        <Col xs={2}>
          <Gigs />
        </Col>
        <Col xs={2}>
          <Profile onClick={() => navigate(`/profile/${userId}`)} />
        </Col>
      </Row>
    </Container>
  );
}

export default NavBar;
