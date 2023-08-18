import * as React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import "./SearchStyle.css";

export default function SearchTable({ searchResult, eventsList }) {
  const [searchName, setSearchName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const handleSearchClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    setShowSearch(true);
  };
  return (
    <Box padding="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="600" color="#101a34">
          Search by Name
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          padding="10px"
          className={`search-bar-container ${isActive ? "active" : ""}`}
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png"
            alt="magnifier"
            className="magnifier"
            onClick={handleSearchClick}
          />
          <input
            type="text"
            className="input"
            placeholder="Search ..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        {console.log("Search result: " + JSON.stringify(searchResult))}
        {searchResult.map((entry) => {
          // if (entry.amount > 0 || entry.gift) {
          const event = eventsList.find(
            (event) => event.eventId === entry.eventId
          );
          return (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" color="#121212">
                {entry.personName}
              </Typography>
              <Typography variant="h6" color="#121212">
                {event ? event.eventName : null}
              </Typography>
              <Typography variant="h6" color="#121212">
                {entry.amount}
              </Typography>
              <Typography variant="h6" color="#121212">
                {entry.gift}
              </Typography>
            </Box>
          );
          // }
        })}
      </Box>
    </Box>
  );
}
