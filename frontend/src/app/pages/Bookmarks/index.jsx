import ListGroup from "app/components/ListGroup";
import Message from "../../../assets/images/message.svg";
import NavBar from "app/components/NavBar";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactComponent as BackArrow } from "../../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import MMLogo from "../../../assets/images/MMTopBarLogo.svg";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";

const Bookmarks = () => {
  const [isCompressedView, setIsCompressedView] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([
    "Gigs",
    "People",
    "Posts",
  ]);
  const filterOptions = ["Gigs", "People", "Posts"];
  const handleFilterChange = (filterName) => {
    if (selectedFilters.includes(filterName)) {
      const newSelectedFilters = selectedFilters.filter(
        (selectedFilter) => selectedFilter !== filterName
      );
      setSelectedFilters([...newSelectedFilters]);
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      let localBookmarkedProfiles = JSON.parse(
        localStorage.getItem("loggedUser.BookmarkedProfiles")
      );
      // TODO: remove hardcode
      localBookmarkedProfiles = [
        "643a388d97188ba31d5e7ef5",
        "643a594474c7b973ea041fa0",
        "643a59922052b5c1bee8dec2",
      ];
      let tempUsers = [];
      const usersResponse = await axios.get("http://localhost:8000/users");
      localBookmarkedProfiles.forEach((u) => {
        tempUsers.push(usersResponse.data[u]);
      });
      let newSearchResults = cloneDeep(searchResults);
      newSearchResults["People"] = tempUsers;
      setSearchResults(newSearchResults);
    };

    const getGigs = async () => {
      let localBookmarkedGigs = JSON.parse(
        localStorage.getItem("loggedUser.BookmarkedGigs")
      );
      // TODO: remove hardcode
      localBookmarkedGigs = [
        "644b8743e961b35e32d9e2e6",
        "644b8832e6094e9ea8879767",
      ];
      let tempGigs = [];
      let gigsResponse = await axios.get("http://localhost:8000/gigs");
      localBookmarkedGigs.forEach((g) => {
        tempGigs.push(gigsResponse.data[g]);
      });
      let newSearchResults = cloneDeep(searchResults);
      searchResults["Gigs"] = tempGigs;
      setSearchResults(newSearchResults);
    };
    getUsers();
    getGigs();
  }, []);

  return (
    <>
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
        <div
          style={{
            padding: "0",
            width: "100vw",
            overflow: "hidden",
            marginTop: "20px",
            paddingLeft: "0px",
            marginBottom: "12px",
          }}
        >
          <Row
            className="d-flex align-content-center align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <Col xs={3} style={{ marginLeft: "20px" }}>
              <BackArrow
                onClick={() => {
                  navigate("/messages");
                }}
              />
            </Col>
            <Col xs={6} style={{ marginRight: "10px" }}>
              <img src={MMLogo} alt="message Image" />
            </Col>
            <Col xs={2}>
              <img
                src={Message}
                alt="Message"
                onClick={() => {
                  navigate("/messages");
                }}
              />
            </Col>
          </Row>
          <div className="row-2" style={{ marginTop: "20px" }}>
            {filterOptions.map((filterName, i) => {
              if (selectedFilters.includes(filterName)) {
                return (
                  <div
                    key={i}
                    className="button-selected"
                    onClick={() => {
                      handleFilterChange(filterName);
                    }}
                  >
                    {filterName}
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className="button"
                  onClick={() => {
                    handleFilterChange(filterName);
                  }}
                >
                  {filterName}
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {searchResults &&
        selectedFilters.map((selectedFilter) => {
          const listData = searchResults[selectedFilter];
          if (listData) {
            return (
              <ListGroup
                groupName={selectedFilter}
                listData={listData}
                isCompressedView={isCompressedView}
                setIsCompressedView={setIsCompressedView}
                resultType={selectedFilter}
                setSelectedFilters={setSelectedFilters}
              />
            );
          }
        })}
    </>
  );
};
export default Bookmarks;
