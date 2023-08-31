import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import { Delete } from "@mui/icons-material";
import CreateEntry from "./CreateEntry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export const RefreshContext = createContext({
  updateRefreshCount: () => {},
});
const NewEntriesPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);

  const [refreshCount, setRefreshCount] = useState(0);

  const updateRefreshCount = () => {
    setRefreshCount(refreshCount + 1);
  };

  function refreshPage() {
    updateRefreshCount();
  }
  const createEntry = () => {
    setCreateModalOpen(true);
  };
  const handleDeleteEntry = (e, entryId) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
    setSelectedRowId(entryId);
  };

  const handleEditEntry = (entryId) => {
    setEditModalOpen(true);
    setSelectedRowId(entryId);
  };

  const navigateToEventsPage = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        // setProfileId(response.data.profileId);
        navigate(`/events?profile=${response.data.profileId}`);
      });
  };
  const getSelectedEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/all/${eventId}`)
      .then((response) => {
        // console.log(response);
        // console.log("fetchAllEntries : " + JSON.stringify(response.data));
        console.log(
          "fetchAllEntries : " + JSON.stringify(response.data.entriesList)
        );
        console.log(
          "totalAmount : " + JSON.stringify(response.data.totalAmount)
        );
        setEntries(response.data.entriesList);
        setTotalAmount(response.data.totalAmount);
        setTotalGift(response.data.totalGift);
      });
  };
  useEffect(() => {
    getSelectedEvent();
    fetchAllEntries();
  }, [refreshCount]);

  return (
    // <RefreshContext.Provider value={{ updateRefreshCount }}>
    <Box m="20px" width="100%" height="100%">
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "2%",
          borderRadius: "10px",
          border: "1px solid #e8ecf1",
          // minHeight: "80vh",
          // width: "100%",
          display: "flex",
          gap: "2%",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        {entries.length > 0 && (
          <>
            {entries.map((entry, index) => (
              <Box
                key={index}
                onClick={() => handleEditEntry(entry.entryId)}
                // onMouseEnter={() => handleBoxHover(index)}
                // onMouseLeave={() => handleBoxHover(null)}
                sx={{
                  backgroundColor: "#f5f7fa",
                  position: "relative",
                  height: "250px",
                  width: "25%",
                  //   width: isNonMobile ? "25%" : "100%",
                  border: "1px solid #cad3dd",
                  borderRadius: "10px",
                  display: "flex",
                  marginBottom: "5%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#50bcd9",
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
                    border: "1px solid #e8ecf1",
                    width: "100%",
                    height: "65%",
                    backgroundImage: `url(${
                      entry.presentType === "amount"
                        ? "/img/money1.png"
                        : "/img/gift1.png"
                    })`,
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
                  //   flexDirection="column"
                  //   gap="20%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,

                        color: "#101a34",
                      }}
                    >
                      {entry.personName}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#a8acb3",
                      }}
                    >
                      {entry.city}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {entry.presentType === "amount" ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="5px"
                        sx={{
                          padding: "5px",
                          background: "#e8ecf1",
                          borderRadius: "5px",
                          border: "1px solid #e8ecf1",
                        }}
                      >
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
                          {entry.amount}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="5px"
                        sx={{
                          padding: "5px",
                          background: "#e8ecf1",
                          borderRadius: "5px",
                          border: "1px solid #e8ecf1",
                        }}
                      >
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
                          {entry.gift}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                {/* {hoveredIndex === index && (
                  <EditIcon
                    onClick={(event) =>
                      handleEditEvent(singleEvent.eventId, event)
                    }
                    sx={{
                      fontSize: "30px",
                      position: "absolute",
                      top: "10%",
                      left: "90%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                      backgroundColor: "red",
                      padding: "5px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                )} */}
              </Box>
            ))}
            {/* {entries.map((entry, index) => (
              <Box
                gridColumn="span 6"
                key={index}
                onClick={() => handleEditEntry(entry.entryId)}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="20px"
                padding="2%"
                borderRadius="10px"
                sx={{ backgroundColor: "#48cae4" }}
              >
                <Box
                  display="flex"
                  gap="10%"
                  onClick={() => handleEditEntry(entry.entryId)}
                >
                  <Avatar
                    name={entry.personName}
                    size="40"
                    round={true}
                    maxInitials="1"
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="2%"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#023e8a", fontWeight: 600 }}
                      textTransform="capitalize"
                    >
                      {entry.personName}
                    </Typography>
                    <Typography
                      variant="h6"
                      textTransform="capitalize"
                      sx={{ color: colors.grey[100] }}
                    >
                      {entry.city}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleEditEntry(entry.entryId)}
                >
                  {entry.presentType === "amount" ? (
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#023e8a",
                        fontWeight: 600,
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

                  <Box>
                     <EditOrDelete entryId={entry.entryId} />
                    <Button
                      style={{ color: "#fff" }}
                      onClick={(e) => handleDeleteEntry(e, entry.entryId)}
                    >
                      {" "}
                      <Delete />
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))} */}
          </>
        )}
      </Box>

      {createModalOpen ? (
        <CreateEntry
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          eventId={eventId}
        />
      ) : (
        <></>
      )}
      {editModalOpen ? (
        <EditEntry
          entryId={selectedRowId}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      ) : (
        <></>
      )}
      {deleteModalOpen ? (
        <DeleteEntry
          entryId={selectedRowId}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      ) : (
        <></>
      )}
    </Box>
    // </RefreshContext.Provider>
  );
};

export default NewEntriesPage;
