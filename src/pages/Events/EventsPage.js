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

export default function EventsPage() {
  const navigate = useNavigate();
  const [eventslist, setEventsList] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const isMobile = useMediaQuery("(max-width:1000px)");

  const fetchTotals = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/total/${profileId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        setEventsList(response.data);
      });
  };
  useEffect(() => {
    fetchTotals();
  }, []);
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
          <EventsList eventslist={eventslist} />
        </Box>
      </Box>
    </div>
    // </div>
  );
}
