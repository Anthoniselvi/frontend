import React from "react";
import { Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const handleVerifyEmail = () => {
    console.log("Email ID in final:" + email);
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className="login-form-container">
        <h4 className="login-form-title">Check your E.mail</h4>

        <Typography color="black">
          We sent an email to you at {email}. Click the link in your email
          verify it.
        </Typography>

        <button
          onClick={handleVerifyEmail}
          type="submit"
          style={{
            marginTop: "10px",
            backgroundColor: "#50bcd9",
            color: "#ffffff",
            width: "100%",
            height: "44px",
            padding: "8px 15px",
            fontWeight: 600,
            borderRadius: "7px",
            fontSize: "16px",
            lineHeight: "20px",
            fontFamily: "Poppins",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.border = "1px solid #50bcd9";
            e.target.style.backgroundColor = "#f0f2f5";
            e.target.style.color = "#50bcd9";
          }}
          onMouseLeave={(e) => {
            e.target.style.border = "none";
            e.target.style.color = "#ffffff";
            e.target.style.backgroundColor = "#50bcd9";
          }}
        >
          Okay
        </button>
      </div>
      <Footer />
    </>
  );
};

export default VerifyEmail;
