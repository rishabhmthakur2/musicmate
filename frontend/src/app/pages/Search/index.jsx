import ListItem from "app/components/ListItem";
import TopNavBar from "app/components/TopBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../../assets/icons/profile.svg";
import ListGroup from "app/components/ListGroup";
import NavBar from "app/components/NavBar";

const Search = () => {
  const [selectedFilters, setSelectedFilters] = useState([
    "Gigs",
    "People",
    "Posts",
  ]);
  const filterOptions = ["Gigs", "People", "Posts"];
  const [isCompressedView, setIsCompressedView] = useState(true);
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
  useEffect(() => {
    if (selectedFilters.length > 1) {
      setIsCompressedView(true);
    } else {
      setIsCompressedView(false);
    }
  }, [selectedFilters]);
  return (
    <>
      <div style={{ overflow: "hidden", paddingBottom: "72px" }}>
        <TopNavBar
          isSearch={true}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />
        {selectedFilters.map((selectedFilter) => {
          return (
            <ListGroup
              groupName={selectedFilter}
              isCompressedView={isCompressedView}
            />
          );
        })}
        <NavBar />
      </div>
    </>
  );
};

export default Search;
