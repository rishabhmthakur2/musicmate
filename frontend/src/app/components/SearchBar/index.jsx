import React from "react";
import { FaSearch } from "react-icons/fa";
import "./search.scss";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input type="text" placeholder="Search for..." />
    </div>
  );
};

export default SearchBar;
