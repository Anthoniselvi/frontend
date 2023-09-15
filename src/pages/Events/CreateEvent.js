import { Box, Input, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import DatePickerSample from "../../components/Chart/DatePickerSample";
export default function CreateEvent() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  // const { updateRefreshCount } = useContext(RefreshContext);
  const isMobile = useMediaQuery("(max-width:1000px");
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Update the selected date state
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the selectedDate as "YYYY-MM-DD"
    const formattedDate = selectedDate.toISOString().slice(0, 10);

    // Now you can use the formatted date when creating the event
    console.log("Formatted Date:", formattedDate);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/events/add`, {
        eventType: eventType,
        name: name,
        place: place,
        date: formattedDate, // Use the selected date here
        profileId: profileId,
      })
      .then((response) => {
        console.log(response);
        console.log("CreatedEvent: " + JSON.stringify(response.data));
        navigate(`/eventslist?profile=${profileId}`);
      });
    setEventType("");
    setName("");
    setPlace("");
    setSelectedDate("");
    navigate(`/eventslist?profile=${profileId}`);
    // refreshPage();
  };
  return (
    // <div className="home">
    //   <Sidebar profileId={profileId} />
    <div className="homeContainer">
      <Box
        m="20px"
        p="20px"
        marginTop={isMobile ? "70px" : "20px"}
        sx={{
          // height: "100%",
          minHeight: "70vh",
          backgroundColor: "#fff",
          border: "1px solid #e8ecf1",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #e8ecf1",
            height: "20%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "40px",
          }}
        >
          <CardGiftcardIcon sx={{ fontSize: "60px", color: "#bf1110" }} />
          <Typography
            sx={{
              color: "#101a34",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "30px",
              fontWeight: 600,
            }}
          >
            Let's create your Event!
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmit}
          style={{
            margin: "5% 0%",
            // width: "60%",
            width: isMobile ? "100%" : "60%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              // for="eventType"
              style={{
                fontFamily: "Poppins",
                fontSize: "13px",
                lineHeight: "18px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              Event Type
            </label>
            <select
              style={{
                background: "#fff",
                borderRadius: "7px",
                width: "100%",
                height: "44px",
                padding: "8px 15px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#101a34",
                border: "1px solid #cad3dd",
                fontFamily: "Poppins",
              }}
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option>Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="baby">Baby Shower</option>
              <option value="house">House Warming</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              // for="name"
              style={{
                fontFamily: "Poppins",
                fontSize: "13px",
                lineHeight: "18px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={{
                background: "#fff",
                borderRadius: "7px",
                width: "100%",
                height: "44px",
                padding: "8px 15px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#101a34",
                border: "1px solid #cad3dd",
                fontFamily: "Poppins",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              // for="place"
              style={{
                fontFamily: "Poppins",
                fontSize: "13px",
                lineHeight: "18px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              style={{
                background: "#fff",
                borderRadius: "7px",
                width: "100%",
                height: "44px",
                padding: "8px 15px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#101a34",
                border: "1px solid #cad3dd",
                fontFamily: "Poppins",
              }}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <label
              // for="eventName"
              style={{
                fontFamily: "Poppins",
                fontSize: "13px",
                lineHeight: "18px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              Date
            </label>
            <DatePickerSample onDateChange={handleDateChange} />
            {/* <input
              type="date"
              id="eventName"
              name="eventName"
              style={{
                background: "#fff",
                borderRadius: "7px",
                width: "100%",
                height: "44px",
                padding: "8px 15px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#101a34",
                border: "1px solid #cad3dd",
                fontFamily: "Poppins",
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /> */}
          </div>
          <button
            type="submit"
            style={{
              marginTop: "10px",
              // backgroundColor: "#50bcd9",
              backgroundColor: "#bf1110",
              color: "#ffffff",
              width: "100%",
              height: "44px",
              padding: "8px 15px",
              fontWeight: 400,
              borderRadius: "7px",
              fontSize: "16px",
              lineHeight: "20px",
              fontFamily: "Poppins",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.border = "1px solid #bf1110";
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.color = "#bf1110";
            }}
            onMouseLeave={(e) => {
              e.target.style.border = "none";
              e.target.style.color = "#ffffff";
              e.target.style.backgroundColor = "#bf1110";
            }}
          >
            Continue
          </button>
        </form>
      </Box>
    </div>
    // </div>
  );
}
