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
import Avatar from "react-avatar";
import { Delete } from "@mui/icons-material";
import CreateEntry from "./CreateEntry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

export const RefreshContext = createContext({
  updateRefreshCount: () => {},
});
const EntriesPage = () => {
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
    <Box
      // m="2%"
      width="100%"
      height="100%"
      // border="1px solid green"
      display="flex"
      flexDirection="column"
      gap="5%"
    >
      {entries.length > 0 && (
        <>
          {entries.map((entry, index) => (
            <Box
              // gridColumn="span 6"
              key={index}
              onClick={() => handleEditEntry(entry.entryId)}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // gap="20%"
              padding="2%"
              // paddingRight="0%"
              borderRadius="10px"
              border="1px solid #cad3dd"
              sx={{ backgroundColor: "#fafbfd" }}
            >
              <Box
                // border="1px solid red"
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
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#023e8a", fontWeight: 600 }}
                    textTransform="capitalize"
                  >
                    {entry.personName}
                  </Typography>
                  <Typography
                    variant="h6"
                    textTransform="capitalize"
                    sx={{ color: "#5e6577" }}
                  >
                    {entry.city}
                  </Typography>
                </Box>
              </Box>

              <Box
                // border="1px solid green"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
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

                {/* <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                > */}
                {/* <EditOrDelete entryId={entry.entryId} /> */}
                <button
                  style={{ color: "#ff574d", fontSize: 20 }}
                  onClick={(e) => handleDeleteEntry(e, entry.entryId)}
                >
                  <Delete sx={{ fontSize: 20 }} />
                </button>
                {/* </Box> */}
              </Box>
            </Box>
          ))}
        </>
      )}

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

export default EntriesPage;
