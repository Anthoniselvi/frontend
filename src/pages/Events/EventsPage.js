import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import EventsList from "./EventsList";
import Sidebar from "../Sidebar/Sidebar";
import { useMediaQuery } from "@mui/material";
import { useRefreshContext } from "../../RefreshContext";
export default function EventsPage() {
  const isMobile = useMediaQuery("(max-width:1000px)");

  return (
    // <div className="home">
    //   <Sidebar profileId={profileId} />
    <div className="homeContainer">
      <Box margin="30px" paddingTop={isMobile ? "50px" : "undefined"}>
        <Typography
          variant="h2"
          sx={{
            color: "#101a34",
            fontFamily: "Poppins",
            fontWeight: 600,
            //   fontSize: "32px",
            //   lineHeight: "34px",
          }}
        >
          Events
        </Typography>

        <Box
          sx={{
            width: "100%",
            minHeight: "80vh",
            borderRadius: "10px",
            paddingTop: "2%",
          }}
        >
          <EventsList />
        </Box>
      </Box>
    </div>
    // </div>
  );
}
