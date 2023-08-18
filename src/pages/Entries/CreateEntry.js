import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import { RefreshContext } from "./Entries";
// import { RefreshContext } from "./index";

export default function CreateEntry({ open, onClose, eventId }) {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState(0);
  const [gift, setGift] = useState("");
  const [presentType, setPresentType] = useState("amount");
  //    const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    // updateRefreshCount();
  }

  const handleClose = () => {
    onClose();
    setPersonName("");
    setCity("");
    setPresentType("");
    setAmount("");
    setGift("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/entries/add`, {
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
        eventId: eventId,
      })
      .then((response) => {
        console.log(response);
        console.log("Created New Entry: " + response.data);
      });

    setPersonName("");
    setCity("");
    setPresentType("");
    setAmount("");
    setGift("");
    onClose();
    //   refreshPage();
  };

  return (
    <Dialog
      open={open}
      PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
    >
      <DialogTitle textAlign="center" variant="h4">
        Create
      </DialogTitle>
      <DialogContent>
        <form style={{ paddingTop: 2 }}>
          <TextField
            fullWidth
            sx={{
              // width: "300px",
              // margin: "5px",
              "& > div": { width: isNonMobile ? "300px" : "250px" },
              "& .MuiFormLabel-root": {
                color: "#121212",
              },
              "& .MuiInputBase-root": {
                color: "#121212",
              },
              "& .MuiMenuItem-root": {
                backgroundColor: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "green",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "purple",
              },
              "& .MuiSelect-icon": {
                color: "#121212",
              },
            }}
            type="text"
            label="Person Name"
            variant="outlined"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            sx={{
              // width: "300px",
              // margin: "5px",
              "& > div": { width: isNonMobile ? "300px" : "250px" },
              "& .MuiFormLabel-root": {
                color: "#121212",
              },
              "& .MuiInputBase-root": {
                color: "#121212",
              },
              "& .MuiMenuItem-root": {
                backgroundColor: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "green",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "purple",
              },
              "& .MuiSelect-icon": {
                color: "#121212",
              },
            }}
            type="text"
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <br />
          <FormControl
            fullWidth
            sx={{
              // width: "300px",
              // margin: "5px",
              "& > div": { width: isNonMobile ? "300px" : "250px" },
              "& .MuiFormLabel-root": {
                color: "#121212",
              },
              "& .MuiRadio-root": {
                color: "#121212",
              },
            }}
          >
            <FormLabel
              fullWidth
              id="demo-controlled-radio-buttons-group"
              // style={{ width: "300px", margin: "5px" }}
            >
              Type of Presentation :
            </FormLabel>
            <br />
            <RadioGroup
              value={presentType}
              onChange={(e) => setPresentType(e.target.value)}
            >
              {/* <div className="radio-button"> */}
              <FormControlLabel
                control={<Radio />}
                label="Amount"
                value="amount"

                // defaultChecked={selected === "amount"}
                // onChange={(e) => setSelected(e.target.value)}
              />
              <FormControlLabel
                control={<Radio />}
                label="Gift"
                value="gift"

                // defaultChecked={selected === 0}
                // onChange={(e) => setSelected(e.target.value)}
              />
              <br />

              {/* </div> */}
              {presentType === "amount" ? (
                // <div>
                <TextField
                  fullWidth
                  sx={{
                    // width: "300px",
                    // margin: "5px",
                    "& > div": { width: isNonMobile ? "300px" : "250px" },
                    "& .MuiInputLabel-root": { color: "#121212" },
                    "& .MuiInputBase-input": {
                      color: "#121212",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "green",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "purple",
                    },
                  }}
                  id="outlined-amount"
                  label="Rs."
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  // sx={{ width: "300px", marginBottom: "5%" }}
                />
              ) : (
                // </div>
                // <div className="gift-box">
                <TextField
                  fullWidth
                  sx={{
                    // width: "300px",
                    // margin: "5px",
                    "& > div": { width: isNonMobile ? "300px" : "250px" },
                    "& .MuiInputLabel-root": { color: "#121212" },
                    "& .MuiInputBase-input": {
                      color: "#121212",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "green",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "purple",
                    },
                  }}
                  id="outlined-multiline-static"
                  label="about gift"
                  multiline
                  // rows={4}
                  // sx={{ width: "300px", marginBottom: "5%" }}
                  onChange={(e) => setGift(e.target.value)}
                  value={gift}
                />
                // </div>
              )}
            </RadioGroup>
          </FormControl>

          <br />
          <br />
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          sx={{ backgroundColor: "rgb(80, 188, 217)" }}
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{ backgroundColor: "rgb(80, 188, 217)" }}
          type="submit"
          color="secondary"
          variant="contained"
          onClick={(e) => handleSubmit(e, eventId)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
