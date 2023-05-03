import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../SearchBar";
import NavLogo from "../../../assets/images/navLogo.svg";
import Message from "../../../assets/images/message.svg";
import "./navBar.scss";
import { useNavigate } from "react-router-dom";

const TopNavBar = ({
  isSearch = false,
  selectedFilters,
  filterOptions,
  handleFilterChange,
}) => {
  const navigate = useNavigate();
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
          <SearchBar />
          <img
            className="profile-icon"
            src={Message}
            alt="Message"
            onClick={() => {
              navigate("/messages");
            }}
          />
        </div>
        {isSearch && (
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
        )}
      </Container>
    </>
  );
};

export default TopNavBar;
