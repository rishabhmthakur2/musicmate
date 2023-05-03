import "./chat.scss";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Send } from "../../../assets/icons/sendMessage.svg";
import { ReactComponent as BackArrow } from "../../../assets/icons/back.svg";
import { useState, useEffect } from "react";
import Profile from "../../../assets/icons/profile.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };
  const { userName, messages, senderId, receiverId } = location.state;
  const updatedMessages = [...messages].reverse();
  useEffect(() => {
    setLoggedInUserId(JSON.parse(localStorage.getItem("loggedUser"))._id);
  }, []);

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
              <p className="user-name-heading" style={{ textAlign: "center" }}>
                {userName}
              </p>
            </Row>
          </Col>
        </Row>
        <div class="chat-container">
          <div class="message-container">
            {updatedMessages.map((message, i) => {
              return (
                <>
                  <div
                    class={
                      loggedInUserId == message.sender_id
                        ? "message-bubble right"
                        : "message-bubble left"
                    }
                  >
                    <p>{message.message_content}</p>
                  </div>
                  <br />
                </>
              );
            })}
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
                onClick={async () => {
                  console.log({ message: inputText });
                  try {
                    const sendMessage = await axios.post(
                      "http://localhost:8000/messages",
                      {
                        senderId: senderId,
                        receiverId: receiverId,
                        messageContent: inputText,
                      }
                    );
                    if (sendMessage.status === 200) {
                      messages.unshift({
                        sender_id: senderId,
                        receiver_id: receiverId,
                        message_content: inputText,
                      });
                      setInputText("");
                    }
                  } catch (e) {
                    console.log("Something went wrong");
                  }
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
