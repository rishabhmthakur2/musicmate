import "./navBar.scss";
import { useNavigate } from "react-router-dom";
import TopNavBar from "app/components/TopBar/GigSpecific";
import { useState, useEffect } from "react";
import ListGroup from "app/components/ListGroup";
import axios from "axios";
import NavBar from "app/components/NavBar";
import Loader from "app/components/Loader";

const Gigs = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [gigIds, setGigIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userLocation = JSON.parse(localStorage.getItem("loggedUser")).Location
    .city;
  useEffect(() => {
    const getGigsData = async () => {
      try {
        const gigsData = await axios.get("http://localhost:8000/gigs");
        if (gigsData.status === 200) {
          setGigs(gigsData.data);
          setGigIds(Object.keys(gigsData.data));
        }
      } catch (e) {
        console.log("Something went wrong");
      }
    };
    getGigsData();
  }, []);
  useEffect(() => {
    let temp = [];
    gigIds.forEach((id) => {
      temp.push(gigs[id]);
    });
    setGigs(temp);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [gigIds]);
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
      {!isLoading && (
        <>
          <TopNavBar setSearchResults={setSearchResults} />
          {gigs !== [] ? (
            <>
              <ListGroup
                groupName={"Gigs"}
                listData={gigs}
                isCompressedView={false}
                resultType={"Gigs"}
              />
            </>
          ) : (
            <p
              className="auth-title"
              style={{
                textAlign: "center",
                alignContent: "center",
                marginTop: "20px",
              }}
            >
              No results found
            </p>
          )}
          <NavBar />
        </>
      )}
      {isLoading && (
        <>
          <TopNavBar setSearchResults={setSearchResults} />
          <Loader />
          <NavBar />
        </>
      )}
    </div>
  );
};

export default Gigs;
