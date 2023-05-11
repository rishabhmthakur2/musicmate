import ListItem from "app/components/ListItem";
import MMLogo from "../../../assets/icons/MusicMate List Item Logo.svg";
import "./listGroup.scss";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ListGroup = ({
  groupName,
  listData,
  isCompressedView,
  setIsCompressedView,
  resultType,
  setSelectedFilters,
  isBookmarkPage = false,
}) => {
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(3);
  const [bookmarkedGigs, setBookmarkedGigs] = useState([]);
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const navigate = useNavigate();
  const onExpandResults = () => {
    setIsCompressedView(false);
    setNumberOfItemsToShow(listData.length);
    setSelectedFilters([groupName]);
  };

  const handleClick = (data) => {
    if (resultType === "Gigs") {
      navigate(`/gigs/${data._id}`);
    } else if (resultType === "People") {
      navigate(`/profile/${data._id}`);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("loggedUser"));
        if (userData) {
          // localStorage.setItem("loggedUser", JSON.stringify(userData.data));
          setBookmarkedUsers([...userData["BookmarkedProfiles"]]);
          setBookmarkedGigs([...userData["BookmarkedGigs"]]);
        }
      } catch (e) {
        console.log("Something went wrong");
      }
    };
    getUserData();
  }, []);

  const checkBookmark = (id, resultType) => {
    if (resultType === "People") {
      return bookmarkedUsers.includes(id);
    } else if (resultType === "Gigs") {
      return bookmarkedGigs.includes(id);
    }
  };

  const handleBookmarkChange = (id, resultType) => {
    let userData = JSON.parse(localStorage.getItem("loggedUser"));
    console.log({ userData });
    if (resultType === "Gigs") {
      const bookmarkedGigs = [...userData["BookmarkedGigs"]];
      if (bookmarkedGigs.includes(id)) {
        const newArray = [...bookmarkedGigs].filter(
          (currentId) => currentId !== id
        );
        userData["BookmarkedGigs"] = [...newArray];
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        setBookmarkedGigs([...newArray]);
      } else {
        userData["BookmarkedGigs"] = [...bookmarkedGigs, id];
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        setBookmarkedGigs([...bookmarkedGigs, id]);
      }
    } else if (resultType === "People") {
      const bookmarkedUsers = userData["BookmarkedProfiles"];
      if (bookmarkedUsers.includes(id)) {
        const newArray = [...bookmarkedUsers].filter(
          (currentId) => currentId !== id
        );
        userData["BookmarkedProfiles"] = [...newArray];
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        setBookmarkedUsers([...newArray]);
      } else {
        userData["BookmarkedProfiles"] = [...bookmarkedUsers, id];
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        setBookmarkedUsers([...bookmarkedUsers, id]);
      }
    }
  };
  return (
    <>
      {listData.length > 0 && (
        <div
          style={{
            display: "flex",
          }}
        >
          <Col xs={12}>
            <div
              style={{
                marginLeft: "20px",
                marginTop: "15px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "29px",
                color: "#373737",
              }}
            >
              {groupName}
            </div>
            {listData.slice(0, numberOfItemsToShow).map((object, index) => {
              return (
                <Row>
                  <ListItem
                    profilePic={MMLogo}
                    heading={
                      resultType === "Gigs"
                        ? object?.Name
                        : resultType === "People"
                        ? object?.FirstName + " " + object?.LastName
                        : object?.Title
                    }
                    subheading={object?.Skills.join(", ")}
                    caption={
                      resultType === "Gigs"
                        ? object?.LocationName
                        : resultType === "People"
                        ? object?.Location?.city
                        : object?.Description
                    }
                    onClick={() => handleClick(object)}
                    handleBookmarkChange={() =>
                      handleBookmarkChange(object._id, resultType)
                    }
                    isBookmarked={checkBookmark(object._id, resultType)}
                  />
                </Row>
              );
            })}

            {isCompressedView && listData.length > 3 && (
              <div
                style={{
                  marginTop: "15px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "#9B9B9B",
                  textAlign: "center",
                  borderTop: "2px solid #CDE0FF",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderBottom: "4px solid #CDE0FF",
                }}
                onClick={onExpandResults}
              >
                See all {groupName.toLowerCase()}
              </div>
            )}
          </Col>
        </div>
      )}
    </>
  );
};

export default ListGroup;
