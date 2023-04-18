import "./chat.scss";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Send } from "../../../assets/icons/sendMessage.svg";
import { ReactComponent as BackArrow } from "../../../assets/icons/back.svg";
import { useState } from "react";
import Profile from "../../../assets/icons/profile.svg";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };
  return (
    <>
      <div
        style={{
          padding: "0",
          width: "100vw",
          overflowX: "hidden",
          marginTop: "20px",
        }}
      >
        <Row className="d-flex align-content-center align-items-center">
          <Col xs={1} style={{ marginLeft: "20px" }}>
            <BackArrow
              onClick={() => {
                navigate("/messages");
              }}
            />
          </Col>
          <Col xs={1}>
            <img
              style={{
                backgroundColor: "#9CC2FF",
                width: "44px",
                height: "44px",
                borderRadius: "50px",
                padding: "2px",
              }}
              src={Profile}
              alt="message Image"
            />
          </Col>
          <Col xs={8} style={{ marginLeft: "25px", alignSelf: "center" }}>
            <Row>
              <p className="user-name-heading">Oliver Stone</p>
            </Row>
          </Col>
        </Row>
        <div class="chat-container">
          <div class="message-container">
            <div class="message-bubble right">
              <p>Hi how’s it going?</p>
            </div>
            <div class="message-bubble right">
              <p>Have you worked on anything new lately?</p>
            </div>
            <div class="message-bubble right">
              <p>I’ve been experiencing this “writer’s block” lately lol</p>
            </div>
            <div class="message-bubble left">
              <p>Oh hello hello! I’m fine</p>
            </div>
            <div class="message-bubble left">
              <p>I do have a new piece, but can I ttyl? I am actually driving right now.</p>
            </div>
            <div class="message-bubble left">
              <p>Hey have you checked out my latest post? That’s the piece I worked on.</p>
            </div>
          </div>
          <Row className="input-container d-flex align-items-baseline">
            <Col xs={9}>
              <input
                type="text"
                className="message-input"
                value={inputText}
                placeholder="Type your message..."
                onChange={handleTextChange}
              />
            </Col>
            <Col xs={2}>
              <Send
                className="paper-plane"
                onClick={() => {
                  console.log({ message: inputText });
                  setInputText("");
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Chat;
