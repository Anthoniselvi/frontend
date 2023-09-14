import * as React from "react";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

export default function SearchOver({
  searchInput,
  setSearchInput,
  onPopoverOpen,
  onPopoverClose,
  anchorEl,
}) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Box display="flex" justifyContent="space-between" padding="2%">
        <h2
          style={{
            color: "#121212",
            fontSize: 20,
            fontFamily: "Poppins",
            fontWeight: 600,
          }}
        >
          Search
        </h2>
        <Button onClick={onPopoverOpen}>
          <SearchIcon style={{ color: "#121212", fontSize: 22 }} />
        </Button>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onPopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <input
          type="text"
          id="name"
          name="name"
          style={{
            background: "#fff",
            borderRadius: "7px",
            width: "81vw",
            height: "44px",
            padding: "8px 15px",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#101a34",
            border: "1px solid #cad3dd",
            fontFamily: "Poppins",
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Popover>
    </div>
  );
}
