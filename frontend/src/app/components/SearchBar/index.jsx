import { FaSearch } from "react-icons/fa";
import "./search.scss";

const SearchBar = ({ onSearchEvent }) => {
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      const searchText = event.target.value;
      onSearchEvent(searchText);
    }
  };
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input type="text" placeholder="Search for..." onKeyUp={handleKeyUp} />
    </div>
  );
};

export default SearchBar;
