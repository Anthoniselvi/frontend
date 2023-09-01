import * as React from "react";
import { useState, useContext, useEffect } from "react";
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
import { useRefreshContext } from "../../RefreshContext";

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
  const { refreshCount, refreshPage } = useRefreshContext();
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
  }, [refreshCount]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
        >
          <DialogTitle textAlign="center" variant="h4" color="#DA344D">
            Edit{" "}
          </DialogTitle>
          <DialogContent>
            <form style={{ paddingTop: 2 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
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
                  Person Name:
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
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
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
                  City:
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div
                style={{
                  width: "300px",
                  margin: "5px",
                }}
              >
                <label
                  htmlFor="demo-controlled-radio-buttons-group"
                  style={{
                    width: "300px",
                    margin: "5px",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    lineHeight: "18px",
                    color: "#101a34",
                    fontWeight: 600,
                  }}
                >
                  Type of Presentation :
                </label>
                <br />
                <br />
                <br />
                <div
                  style={{ display: "flex", alignItems: "center", gap: "30px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      id="amount"
                      name="presentType"
                      value="amount"
                      style={{
                        color: "#121212",
                        width: "16px",
                        height: "16px",
                      }}
                      checked={presentType === "amount"}
                      onChange={() => setPresentType("amount")}
                    />
                    <label
                      htmlFor="amount"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        lineHeight: "18px",
                        color: "#101a34",
                        fontWeight: 600,
                      }}
                    >
                      Amount
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      id="gift"
                      name="presentType"
                      value="gift"
                      style={{
                        color: "#121212",
                        width: "16px",
                        height: "16px",
                      }}
                      checked={presentType === "gift"}
                      onChange={() => setPresentType("gift")}
                    />
                    <label
                      htmlFor="gift"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        lineHeight: "18px",
                        color: "#101a34",
                        fontWeight: 600,
                      }}
                    >
                      Gift
                    </label>
                  </div>
                </div>
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {presentType === "amount" ? (
                    <input
                      type="text"
                      id="amountInput"
                      name="amount"
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
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  ) : (
                    <textarea
                      placeholder="Describe about Gift"
                      type="text"
                      id="gift"
                      name="gift"
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
                      value={gift}
                      onChange={(e) => setGift(e.target.value)}
                    />
                  )}
                </div>
              </div>

              <br />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ backgroundColor: "#ff574d", fontSize: "13px" }}
              type="submit"
              color="secondary"
              variant="contained"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button
              sx={{ backgroundColor: "#56c984", fontSize: "13px" }}
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
