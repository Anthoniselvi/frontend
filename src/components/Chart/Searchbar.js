import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
const Searchbar = ({ onSearchChange }) => {
  return (
    <form className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          name="search"
          placeholder="Search.."
          className="search-input"
          onChange={onSearchChange}
        />
        <SearchIcon
          style={{ color: "#121212", fontSize: 25 }}
          className="search-icon"
        />
      </div>
    </form>
  );
};

export default Searchbar;
