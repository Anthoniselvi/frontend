import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchOver from "./SearchOver";

const EntriesForSearch = ({ eventsList, searchResult }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // Filter the searchResult based on the search input
  const filteredResult = searchResult.filter((entry) => {
    const searchQuery = searchInput.toLowerCase();
    return (
      entry.personName.toLowerCase().includes(searchQuery) ||
      eventsList.some((event) => {
        return (
          event.eventId === entry.eventId &&
          event.eventName.toLowerCase().includes(searchQuery)
        );
      }) ||
      (entry.presentType === "amount" &&
        entry.amount.toString().includes(searchQuery)) || // Convert to string
      entry.gift.toLowerCase().includes(searchQuery)
    );
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopoverOpen(false);
  };
  return (
    <Box
      p="2%"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="5%"
    >
      <SearchOver
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onPopoverOpen={handleClick}
        onPopoverClose={handleClose}
        anchorEl={anchorEl}
      />
      <Box paddingTop={isPopoverOpen ? "10%" : "0%"}>
        {filteredResult.length > 0 ? (
          filteredResult.map((entry, index) => (
            <Box
              key={index}
              display="grid"
              gridTemplateColumns="1fr 2fr 1fr"
              gap="4%"
              padding="2%"
              marginBottom="2%"
              borderRadius="10px"
              border="1px solid #cad3dd"
              sx={{ backgroundColor: "#fafbfd" }}
            >
              <Box>
                <Typography
                  sx={{ color: "#023e8a", fontWeight: 600, fontSize: 14 }}
                  textTransform="capitalize"
                >
                  {entry.personName}
                </Typography>
              </Box>

              <Box>
                {eventsList.map((event, index) =>
                  event.eventId === entry.eventId ? (
                    <Typography
                      key={event.eventId}
                      sx={{ color: "#DA344D", fontWeight: 600, fontSize: 13 }}
                      textTransform="capitalize"
                    >
                      {event.eventName}
                    </Typography>
                  ) : (
                    <React.Fragment key={index} />
                  )
                )}
              </Box>

              <Box>
                {entry.presentType === "amount" ? (
                  <Typography
                    sx={{
                      color: "#023e8a",
                      fontWeight: 600,
                      fontSize: 13,
                      textAlign: "right",
                    }}
                  >
                    ₹ {entry.amount}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#023e8a",
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {entry.gift}
                  </Typography>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            color="#121212"
            fontSize="20px"
            padding="2%"
          >
            No results found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default EntriesForSearch;
