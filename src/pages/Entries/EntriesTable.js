import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
// import "./SearchStyle.css";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteEntry from "./DeleteEntry";
import EditEntry from "./EditEntry";
import NewEntriesPage from "./NewEntriesPage";
import EntriesPage from "./EntriesPage";
export default function EntriesTable() {
  const isNonMobile = useMediaQuery("(max-width: 1000px)");
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

  const handleEditEntry = (entryId) => {
    setEditModalOpen(true);
    setSelectedRowId(entryId);
  };

  const handleDeleteEntry = (e, entryId) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
    setSelectedRowId(entryId);
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
  }, []);
  const columns = [
    { field: "personName", headerName: "Name", flex: 0.2, align: "left" },
    { field: "city", headerName: "City", flex: 0.2, align: "left" },
    { field: "amount", headerName: "Amount (₹)", flex: 0.2, align: "left" },
    { field: "gift", headerName: "Gift", flex: 0.2, align: "left" },
    {
      field: "action",
      headerName: "Action",
      flex: 0.3,
      align: "left",
      renderCell: ({ row }) => (
        // <>
        //   {isNonMobile ? (
        //     <Box sx={{ display: "flex", gap: "1rem" }}>
        //       <Tooltip arrow placement="left" title="Edit">
        //         <IconButton>
        //           <Edit />
        //         </IconButton>
        //       </Tooltip>
        //       <Tooltip arrow placement="right" title="Delete">
        //         <IconButton>
        //           <Delete />
        //         </IconButton>
        //       </Tooltip>
        //     </Box>
        //   ) : (
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <Box
            onClick={() => handleEditEntry(row.entryId)}
            sx={{
              // border: "1px solid #56c984",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              cursor: "pointer",
              padding: "5px 10px",
              // borderRadius: "5px",
              // background: "#56c984",
              // color: "#fff",
              "&:hover": {
                // transition: "0.3s ease",
                // transform: "scale(0.9)",
                // background: "#fafbfd",
                // color: "#56c984",
              },
            }}
          >
            <BiEdit
              style={{
                // color: "#56c984",
                fontSize: "15px",
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h6"
              // color="#56c984"
              //   sx={{ fontWeight: 600 }}
            >
              Edit
            </Typography>
          </Box>
          <Box
            onClick={(e) => handleDeleteEntry(e, row.entryId)}
            sx={{
              // border: "1px solid #ff574d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "5px",
              // background: "#ff574d",
              // color: "#fff",
              "&:hover": {
                // transition: "0.3s ease",
                // transform: "scale(0.9)",
                // color: "#ff574d",
                // background: "#fafbfd",
              },
            }}
          >
            <RiDeleteBin6Line
              style={{
                // color: "#101a34",
                fontSize: "15px",
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h6"
              // color="#101a34"
              //   sx={{ fontWeight: 600 }}
            >
              Delete
            </Typography>
          </Box>
        </Box>
        //   )}
        // </>
      ),
    },
  ];

  const rows = entries.map((row) => ({
    ...row,
    id: row._id,
  }));
  return (
    <Box sx={{ minHeight: "90vh", width: "100%", padding: "20px" }}>
      {isNonMobile ? (
        <EntriesPage />
      ) : (
        <Box
          height="100%"
          width="100%"
          sx={{
            "& .MuiDataGrid-root": {
              // padding: "20px",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: " 1px solid #e8ecf1",
              borderTop: " 1px solid #e8ecf1",
              fontSize: "15px",
              lineHeight: "19px",
              color: "#101a34",
              alignItems: "left",
              // height: "150px",
            },
            "& .name-column--cell": {
              color: "red",
            },
            "& .MuiDataGrid-columnHeaders": {
              // display: "none",
              backgroundColor: "#fafbfd",
              color: "#101a34",
              fontWeight: 600,
              fontSize: 15,
              lineHeight: 18,
              // borderTop: "1px solid #cad3dd",
              // borderBottom: "1px solid #cad3dd",
            },
            "& .MuiButton-text": {
              fontWeight: 600,
              fontSize: "11px",
              lineHeight: "18px",
              color: "#101a34",
            },
            "& .MuiInput-input": {
              color: "black",
            },
            "& .MuiSvgIcon-root": {
              color: "black",
            },
            "& .MuiInput-underline": {
              color: "black",
            },
            "& .MuiDataGrid-virtualScroller": {
              // backgroundColor: "#f5f7fa",
              color: "#121212",
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none",
              borderTop: "none",
              // backgroundColor: colors.blueAccent[700],
              backgroundColor: "lightyellow",
            },
            "& .MuiCheckbox-root": {
              color: "black",
            },
            "& .MuiDataGrid-row": {
              // paddingTop: "40px",
              // paddingBottom: "40px",
              // textAlign: "center",
            },
            "& .MuiDataGrid-row:hover": {
              // backgroundColor: "#e0e0e0",
              // cursor: "pointer",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            //   slots={{ toolbar: QuickSearchToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
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
  );
}
