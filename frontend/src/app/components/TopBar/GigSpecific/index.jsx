import { Container } from "react-bootstrap";
import SearchBar from "../../SearchBar";
import NavLogo from "../../../../assets/images/navLogo.svg";
import Message from "../../../../assets/images/message.svg";
import FilterIcon from "../../../../assets/images/filter.svg";
import "./navBar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TopNavBar = ({ setSearchResults }) => {
  const navigate = useNavigate();
  const onSearchEvent = async (searchText) => {
    const searchResponse = await axios.post("http://localhost:8000/search", {
      searchText: searchText,
      searchTypes: ["Gigs"],
    });
    setSearchResults(searchResponse.data);
  };
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
        <div className="row-1">
          <img
            className="logo"
            src={NavLogo}
            alt="Logo"
            onClick={() => {
              navigate("/landing");
            }}
          />
          <SearchBar onSearchEvent={onSearchEvent} enableNavigation={false} />
          <img className="profile-icon" src={FilterIcon} alt="Filter" />
        </div>
        {/* {isSearch && (
          <div className="row-2">
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
        )} */}
      </Container>
    </>
  );
};

export default TopNavBar;
