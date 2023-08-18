import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useUserAuth } from "../../auth";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

export default function ResetPassword() {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const emailFromQuery = queryParams.get("email") || "";
  const { resetPassword } = useUserAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log("email id: " + email);
    try {
      await resetPassword(email);

      navigate(`/verifyemail?email=${encodeURIComponent(email)}`);
      console.log("Password reset email sent successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-form-container">
        <h4 className="login-form-title">Reset Password</h4>

        <form
          onSubmit={handleResetPassword}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              htmlFor="email"
              style={{
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "18px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              Your Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
          </div>

          <button
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
            Reset Password
          </button>
          {error && <Typography color="red">{error}</Typography>}
        </form>
      </div>
      <Footer />
    </>
  );
}
