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
import { useRefreshContext } from "../../RefreshContext";

export default function CreateEntry({ open, onClose, eventId }) {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState("");
  const [gift, setGift] = useState("");
  const [presentType, setPresentType] = useState("amount");
  const { refreshCount, refreshPage } = useRefreshContext();

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

        // After successfully creating the entry, trigger a refresh of the EntriesTable.
        refreshPage();

        // Reset form fields
        setPersonName("");
        setCity("");
        setPresentType("");
        setAmount("");
        setGift("");
        onClose();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error creating new entry:", error);
      });
  };

  return (
    <Dialog
      open={open}
      PaperProps={{ sx: { backgroundColor: "#fff", color: "#121212" } }}
    >
      <DialogTitle textAlign="center" variant="h4" color="#DA344D">
        CREATE
      </DialogTitle>
      <DialogContent>
        <form style={{ paddingTop: 2, width: isMobile ? "250px" : "300px" }}>
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
              width: "100%",
              margin: "5px",
            }}
          >
            <label
              htmlFor="demo-controlled-radio-buttons-group"
              style={{
                width: "100%",
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
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          sx={{ backgroundColor: "#ff574d", fontSize: "13px" }}
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{ backgroundColor: "#56c984", fontSize: "13px" }}
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
