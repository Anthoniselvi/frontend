import React from "react";
// import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./Works.css";

export default function Works() {
  //   const navigate = useNavigate();

  const navigateToSignUp = () => {
    // navigate("/signup");
  };
  return (
    <div className="works-container" id="works">
      <div className="works-title-container">
        <h1 className="works-title">How It Works</h1>
      </div>

      <Box className="works-inner-box">
        <Box className="works-img-box">
          <img className="works-img" alt="image" src="/img/ph1.png" />
        </Box>
        <Box className="works-text-box">
          <h2 className="works-text-title">
            Create a registry for each ocassion
          </h2>
          <div className="works-bottom-container">
            <div className="works-content-box">
              <img
                className="works-content-img"
                alt="image"
                src="/img/check.png"
              />
              <h4 className="works-content">
                Record the gift details for birthdays, weddings, housewarming,
                ear-piercing, and more.
              </h4>
            </div>
            <div className="works-content-box">
              <img
                className="works-content-img"
                alt="image"
                src="/img/check.png"
              />

              <h4 className="works-content">
                Share your list with your spouse and family.
              </h4>
            </div>
          </div>

          <button className="works-button" onClick={navigateToSignUp}>
            Get Started
          </button>
        </Box>
      </Box>
    </div>
  );
}
