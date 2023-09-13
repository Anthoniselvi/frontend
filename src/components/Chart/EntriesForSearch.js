import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useState } from "react";

import Searchbar from "./Searchbar";

const EntriesForSearch = ({ eventsList, searchResult }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(searchResult);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the results based on the search query
    const filtered = searchResult.filter((entry) => {
      if (
        entry.personName.includes(query.toLowerCase())
        // (entry.presentType === "amount" &&
        //   entry.amount.toString().includes(query)) || // Use optional chaining to handle potential undefined
        // (entry.presentType !== "amount" && entry.gift?.includes(query)) // Use optional chaining to handle potential undefined
      ) {
        return true;
      }
      return false;
    });
    console.log("filtered: " + JSON.stringify(filtered));
    setFilteredResults(filtered);
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
      <Searchbar
        eventsList={eventsList}
        searchResult={searchResult}
        onSearchChange={handleSearchChange}
      />
      {searchResult.length > 0 && (
        <>
          {searchResult.map((entry, index) => (
            <Box
              key={index}
              display="grid"
              gridTemplateColumns="1fr 2fr 1fr"
              gap="4%"
              padding="2%"
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
          ))}
        </>
      )}
    </Box>
  );
};

export default EntriesForSearch;
