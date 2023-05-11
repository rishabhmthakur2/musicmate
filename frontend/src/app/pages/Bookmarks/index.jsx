import { useNavigate } from "react-router-dom";
import TopNavBar from "app/components/TopBar";
import { useState, useEffect } from "react";
import ListGroup from "app/components/ListGroup";
import axios from "axios";
import NavBar from "app/components/NavBar";
import Loader from "app/components/Loader";

const Gigs = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarkedGigs, setBookmarkedGigs] = useState([]);
  const [bookmarkedGigIDs, setBookmarkedGigIDs] = useState([]);
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [bookmarkedUserIDs, setBookmarkedUserIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("loggedUser"));
        console.log({ userData });
        // const userData = await axios.get(
        //   `http://localhost:8000/users/${userId}`
        // );
        if (userData) {
          // localStorage.setItem("loggedUser", JSON.stringify(userData.data));
          // const data = userData.data[0];
          // console.log({ data });
          setBookmarkedUserIDs([...userData["BookmarkedProfiles"]]);
          setBookmarkedGigIDs([...userData["BookmarkedGigs"]]);
        }
      } catch (e) {
        console.log("Something went wrong");
      }
    };
    getUserData();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const setBookmarkGigs = async () => {
      try {
        let tempGigs = [];
        bookmarkedGigIDs.forEach(async (gigId) => {
          try {
            const gigData = await axios.get(
              `http://localhost:8000/gigs/${gigId}`
            );
            if (gigData.status === 200) {
              tempGigs.push(gigData.data.data[0]);
              setBookmarkedGigs([...tempGigs]);
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            }
          } catch (e) {
            console.log("Something went wrong");
          }
        });
      } catch (e) {
        console.log("Something went wrong");
      }
    };
    setBookmarkGigs();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [bookmarkedGigIDs]);
  useEffect(() => {
    setIsLoading(true);

    const setBookmarkedUserData = async () => {
      try {
        let tempUsers = [];
        bookmarkedUserIDs.forEach(async (userId) => {
          try {
            const userData = await axios.get(
              `http://localhost:8000/users/${userId}`
            );
            if (userData.status === 200) {
              tempUsers.push(userData.data[0]);
              setBookmarkedUsers([...tempUsers]);
            }
          } catch (e) {
            console.log("Something went wrong");
          }
        });
      } catch (e) {
        console.log("Something went wrong");
      }
    };
    setBookmarkedUserData();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [bookmarkedUserIDs]);
  return (
    <div
      style={{
        margin: "0",
        marginBottom: "70px",
        padding: "0",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <TopNavBar setSearchResults={setSearchResults} />
      {isLoading && <Loader />}
      {!isLoading && bookmarkedGigs !== [] && (
        <>
          <ListGroup
            groupName={"Gigs"}
            listData={bookmarkedGigs}
            isCompressedView={true}
            resultType={"Gigs"}
            setBookmarkedGigIDs={setBookmarkedGigIDs}
            setBookmarkedUserIDs={setBookmarkedUserIDs}
          />
        </>
      )}
      {!isLoading && bookmarkedUsers !== [] && (
        <>
          <ListGroup
            groupName={"People"}
            listData={bookmarkedUsers}
            isCompressedView={true}
            resultType={"People"}
            setBookmarkedGigIDs={setBookmarkedGigIDs}
            setBookmarkedUserIDs={setBookmarkedUserIDs}
          />
        </>
      )}
      {bookmarkedUsers === [] && bookmarkedGigs === [] && (
        <>
          <p>No bookmarks found</p>
        </>
      )}

      <NavBar />
    </div>
  );
};

export default Gigs;
