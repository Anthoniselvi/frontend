import * as React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useRefreshContext } from "../../RefreshContext";

export default function DeleteEntry({ entryId, open, onClose }) {
  const [personName, setPersonName] = useState();
  const { refreshCount, refreshPage } = useRefreshContext();
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/entries/delete/${entryId}`)
      .then((response) => {
        console.log("Deleted Parts :" + JSON.stringify(response));
      });
    onClose();
    refreshPage();
  };

  const getSelectedEntry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/single/${entryId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        setPersonName(response.data.personName);
      });
  };
  useEffect(() => {
    getSelectedEntry();
  }, [refreshCount]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
      >
        {/* <DialogTitle>Entry ID : {entryId}</DialogTitle> */}
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#121212",
              fontSize: "16px",
              fontFamily: "Poppins",
              textAlign: "center",
            }}
          >
            Are you sure want to Delete <b>{personName}</b>?
          </DialogContentText>
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: "rgb(80, 188, 217)" }}
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            sx={{ backgroundColor: "rgb(80, 188, 217)" }}
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
