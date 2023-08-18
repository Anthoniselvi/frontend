import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTheme } from "@mui/material/styles";

import { ThemeProvider } from "@mui/styles";

// import { RefreshContext } from "./Entries";
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});
export default function EditEntry({ open, onClose, entryId }) {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [personName, setPersonName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [gift, setGift] = useState("");
  const [presentType, setPresentType] = useState("");
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // const { updateRefreshCount } = useContext(RefreshContext);

  function refreshPage() {
    // updateRefreshCount();
  }

  const handleEditSave = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/entries/edit/${entryId}`, {
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
      })
      .then((response) => {
        console.log("Updated Entry : " + JSON.stringify(response));
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
        setCity(response.data.city);
        setPresentType(response.data.presentType);
        setAmount(response.data.amount);
        setGift(response.data.gift);
      });
  };
  useEffect(() => {
    getSelectedEntry();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
        >
          <DialogTitle textAlign="center" variant="h4">
            Edit{" "}
          </DialogTitle>
          <DialogContent>
            <form>
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
                type="text"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <br />
              <br />
              <FormControl
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
                  id="demo-controlled-radio-buttons-group"
                  sx={{
                    // width: "300px", margin: "5px",
                    color: "#fff",
                    "& > div": { width: isNonMobile ? "300px" : "250px" },
                  }}
                >
                  Type of Presentation :
                </FormLabel>
                <br />
                <RadioGroup
                  value={presentType}
                  onChange={(e) => setPresentType(e.target.value)}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label="Amount"
                    value="amount"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="Gift"
                    value="gift"
                  />
                  <br />

                  {presentType === "amount" ? (
                    // <div>
                    <TextField
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
                      onChange={(e) => setGift(e.target.value)}
                      value={gift}
                    />
                  )}
                </RadioGroup>
              </FormControl>

              <br />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ backgroundColor: "rgb(80, 188, 217)" }}
              type="submit"
              color="secondary"
              variant="contained"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button
              sx={{ backgroundColor: "rgb(80, 188, 217)" }}
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleEditSave}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
