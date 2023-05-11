import TopNavBar from "app/components/TopBar";
import { useEffect, useState } from "react";
import ListGroup from "app/components/ListGroup";
import NavBar from "app/components/NavBar";
import axios from "axios";
import Loader from "app/components/Loader";

const Search = () => {
  const [isCompressedView, setIsCompressedView] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [isLoading, setIsLoading] = useState(false);
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

  const onSearchEvent = async (searchText) => {
    setIsLoading(true);
    const searchResponse = await axios.post("http://localhost:8000/search", {
      searchText: searchText,
      searchTypes: ["Gigs", "Posts", "People"],
    });
    setSearchResults(searchResponse.data);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedFilters.length > 1) {
      setIsCompressedView(true);
    } else {
      setIsCompressedView(false);
    }
    setIsLoading(false);
  }, [selectedFilters]);
  return (
    <>
      <div style={{ overflow: "hidden", paddingBottom: "72px" }}>
        <TopNavBar
          isSearch={true}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          onSearchEvent={onSearchEvent}
        />
        {isLoading && <Loader />}
        {!isLoading &&
          searchResults &&
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
        <NavBar />
      </div>
    </>
  );
};

export default Search;
