import { FaSearch } from "react-icons/fa";
import "./search.scss";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearchEvent }) => {
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      const searchText = event.target.value;
      onSearchEvent(searchText);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        autoFocus
        placeholder="Search for..."
        onKeyUp={handleKeyUp}
        onClick={() => {
          navigate("/search");
        }}
      />
    </div>
  );
};

export default SearchBar;
