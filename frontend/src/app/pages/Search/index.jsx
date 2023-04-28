import ListItem from "app/components/ListItem";
import TopNavBar from "app/components/TopBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../../assets/icons/profile.svg";
import ListGroup from "app/components/ListGroup";

const Search = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
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
  return (
    <>
      <TopNavBar
        isSearch={true}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
      <ListGroup groupName={"Gigs"} />
      <ListGroup groupName={"People"} />
      <ListGroup groupName={"Songs"} />
    </>
  );
};

export default Search;
