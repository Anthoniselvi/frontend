import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useRefreshContext } from "../../RefreshContext";
import { useNavigate } from "react-router-dom";

export default function DeleteEventFromEventPage({
  eventId,
  open,
  onClose,
  eventName,
  profileId,
}) {
  const navigate = useNavigate();
  const { refreshCount, refreshPage } = useRefreshContext();
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/events/delete/${eventId}`)
      .then((response) => {
        console.log("Deleted Parts :" + JSON.stringify(response));
      });
    onClose();
    refreshPage();
    navigate(`/eventslist?profile=${profileId}`);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
      >
        {/* <DialogTitle>Event ID : {eventId}</DialogTitle> */}
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Poppins",
              textAlign: "center",
              color: "#121212",
              fontSize: "16px",
            }}
          >
            Are you sure want to Delete <b>{eventName}</b> & all their Entries?
          </DialogContentText>
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: "#ff574d", fontSize: "13px" }}
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            sx={{ backgroundColor: "#56c984", fontSize: "13px" }}
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
