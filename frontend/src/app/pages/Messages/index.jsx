import MessageListItem from "app/components/MessageListItem";
import Profile from "../../../assets/icons/profile.svg";
import { useState, useEffect } from "react";
import NavBar from "app/components/NavBar";
import SearchBar from "app/components/SearchBar";
import { ReactComponent as BackArrow } from "../../../assets/icons/back.svg";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Messages = () => {
  const navigate = useNavigate();
  const [profileUserName, setProfileUserName] = useState("Margaret Mulholland");
  const [chatData, setChatData] = useState([
    {
      messengerName: "",
      messengerId: "",
      userId: "",
      messages: [],
      messageTime: "",
      unread: "",
    },
  ]);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("loggedUser"))._id;
    setProfileUserName(
      (
        JSON.parse(localStorage.getItem("loggedUser")).FirstName +
        " " +
        JSON.parse(localStorage.getItem("loggedUser")).LastName
      ).toUpperCase()
    );
    const getList = async (userId) => {
      const chatListData = await axios.get(
        `http://localhost:8000/messages/chatlist/${userId}`
      );
      const chatList = chatListData.data;
      console.log({ chatList });
      try {
        const test = await chatList.map(async (user) => {
          const chatData = await axios.get(
            `http://localhost:8000/messages/${userId}/${user}`
          );
          return {
            userId,
            messengerName: chatData.data.receiverName,
            messengerId: user,
            messages: chatData.data.messages,
            messageTime: "",
            unread: "",
          };
        });
        const results = await Promise.all(test);
        setChatData(results);
      } catch (e) {
        console.log("Something went wrong");
      }
    };
    getList(userId);
  }, []);

  return (
    <div
      style={{
        margin: "20px 0px 0px",
        marginBottom: "70px",
        padding: "0",
        width: "100vw",
        overflowX: "hidden",
        marginTop: "20px",
      }}
    >
      <Row className="d-flex align-content-center align-items-center">
        {" "}
        <Col
          xs={1}
          style={{ marginLeft: "20px" }}
          onClick={() => {
            navigate("/landing");
          }}
        >
          <BackArrow />
        </Col>
        <Col xs={9}>
          <p
            style={{
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "24px",
              lineHeight: "29px",
              color: "#373737",
              textAlign: "center",
            }}
          >
            {profileUserName}
          </p>
        </Col>
        {/* <Col xs={1}>
          <p
            style={{
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "22px",
              backgroundColor: "#3A86FF",
              height: "30px",
              width: "30px",
              borderRadius: "50px",
              padding: "3px",
              marginRight: "10px",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {unreadCount}
          </p>
        </Col> */}
      </Row>

      <div style={{ margin: "20px" }}>
        <SearchBar />
      </div>
      <p
        style={{
          margin: "0 20px 10px",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "18px",
          lineHeight: "22px",
          display: "flex",
          alignItems: "center",
        }}
      >
        Messages
      </p>
      {chatData.map((message, i) => {
        return (
          <MessageListItem
            key={i}
            profilePic={Profile}
            userName={message.messengerName}
            messagePreview={message.messages[0]?.message_content}
            messageTime={message.messageTime}
            unread={message.unread}
            senderId={message.userId}
            receiverId={message.messengerId}
            messages={message.messages}
          />
        );
      })}
      <NavBar />
    </div>
  );
};

export default Messages;
