import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery, Typography, Box } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EditIcon from "@mui/icons-material/Edit";
import EditEvent from "./EditEvent";
import { useRefreshContext } from "../../RefreshContext";
export default function EventsList() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [eventslist, setEventsList] = useState([]);

  const { refreshCount, refreshPage } = useRefreshContext();

  const handleEditEvent = (eventId, event) => {
    console.log("edit button clicked");
    event.stopPropagation(); // Stop event propagation to the parent Box

    setAnchorEl(null);
    setEditModalOpen(true);
    setSelectedRowId(eventId);
  };

  const onUpdateEvent = (updatedEventData) => {
    // Find the index of the updated event in eventslist
    const updatedEventIndex = eventslist.findIndex(
      (event) => event.eventId === updatedEventData.eventId
    );

    if (updatedEventIndex !== -1) {
      // Create a new copy of eventslist with the updated event
      const updatedEventsList = [...eventslist];
      updatedEventsList[updatedEventIndex] = updatedEventData;

      // Update the state with the new eventslist
      setEventsList(updatedEventsList);
    }
  };

  const navigateToSingleEventPage = (eventId) => {
    navigate(`/eventpage?event=${eventId}`);
  };

  const navigateToCreateEvent = () => {
    navigate(`/newevent?profile=${profileId}`);
  };

  const handleBoxHover = (index) => {
    setHoveredIndex(index);
  };
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
  }, [refreshCount]);

  return (
    <Box sx={{ width: "100%", minHeight: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: isNonMobile ? "2%" : "5%",
          borderRadius: "10px",
          border: "1px solid #feeae9",
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "2%",
          // flexWrap: 'wrap',
          // justifyContent: "space-between",
          // flexWrap: isNonMobile ? "wrap" : "nowrap",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        <Box
          onClick={navigateToCreateEvent}
          sx={{
            height: isNonMobile ? "250px" : "100px",
            // width: '30%',
            width: isNonMobile ? "30%" : "100%",
            marginBottom: isNonMobile ? undefined : "5%",
            border: "1px solid #feeae9",
            borderRadius: "10px",
            display: "flex",
            gap: "5%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#feeae9",

            "&:hover": {
              // backgroundColor: "#bf1110",
              backgroundColor: "#DA344D",
              // " #C21010",
              // #50bcd9
              color: "#ffffff",
              "& .MuiTypography-root, & .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            },
          }}
        >
          <ControlPointIcon sx={{ fontSize: "40px", color: "#bf1110" }} />
          {/* color: "#50bcd9" */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "17px",
              lineHeight: "22px",
              fontFamily: "Poppins",
              color: "#bf1110",
            }}
          >
            Create a new Event
          </Typography>
        </Box>

        {eventslist.map((singleEvent, index) => (
          <Box
            key={index}
            onClick={() => navigateToSingleEventPage(singleEvent.eventId)}
            onMouseEnter={() => handleBoxHover(index)}
            onMouseLeave={() => handleBoxHover(null)}
            sx={{
              // backgroundColor: "#f5f7fa",
              backgroundColor: "#feeae9",
              position: "relative",
              height: "250px",
              // width: '30%',
              width: isNonMobile ? "30%" : "100%",
              border: "1px solid #feeae9",
              borderRadius: "10px",
              display: "flex",
              marginBottom: "5%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#DA344D",
                // "#50bcd9",
                color: "#ffffff",
                "& .MuiTypography-root, & .MuiSvgIcon-root": {
                  color: "#ffffff",
                },
              },
            }}
          >
            <div
              style={{
                overflow: "hidden",
                width: "100%",
                height: "65%",
                backgroundImage: `url(${singleEvent.eventImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            ></div>

            <Box
              padding="0% 5%"
              width="100%"
              height="35%"
              display="flex"
              flexDirection="column"
              gap="20%"
              alignItems="left"
              justifyContent="center"
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontFamily: "Poppins",
                  color: "#101a34",
                }}
              >
                {singleEvent.eventName}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap="5px">
                  <CurrencyRupeeIcon
                    sx={{ fontSize: "20px", color: "#d3133b" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "17px",
                      lineHeight: "22px",
                      fontFamily: "Poppins",
                      color: "#d3133b",
                    }}
                  >
                    {singleEvent.totalAmount}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="5px">
                  <CardGiftcardIcon
                    sx={{ fontSize: "20px", color: "#d3133b" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "17px",
                      lineHeight: "22px",
                      fontFamily: "Poppins",
                      color: "#d3133b",
                    }}
                  >
                    {singleEvent.totalGift}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {hoveredIndex === index && (
              <EditIcon
                onClick={(event) => handleEditEvent(singleEvent.eventId, event)}
                sx={{
                  fontSize: "30px",
                  position: "absolute",
                  top: "10%",
                  left: "90%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  backgroundColor: "#DA344D",
                  padding: "5px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      {editModalOpen ? (
        <EditEvent
          eventId={selectedRowId}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          // onUpdateEvent={onUpdateEvent} // Pass the onUpdateEvent function
          eventslist={eventslist} // Pass eventslist as a prop
          setEventsList={setEventsList}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
