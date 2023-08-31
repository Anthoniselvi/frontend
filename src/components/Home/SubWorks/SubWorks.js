import React from "react";
// import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import "./SubWorks.css";
import DoneIcon from "@mui/icons-material/Done";
export default function SubWorks() {
  //   const navigate = useNavigate();

  const navigateToSignUp = () => {
    // navigate("/signup");
  };
  return (
    <div className="subworks-container">
      <Box className="subworks-inner-box">
        <Box className="subworks-text-box">
          <h2 className="subworks-heading">Easily track your gifts</h2>
          <div className="subworks-content-container">
            <div className="subworks-content-box">
              <div className="subworks-img">
                <DoneIcon style={{ fontSize: 20 }} />
              </div>
              {/* <img className="subworks-img" src="/img/check.png" /> */}
              <h4 className="subworks-content-text">
                Track your full history of received gifts.
              </h4>
            </div>
            <div className="subworks-content-box">
              <div className="subworks-img">
                <DoneIcon style={{ fontSize: 20 }} />
              </div>

              <h4 className="subworks-content-text">
                Never miss someone from the giftbook.
              </h4>
            </div>
          </div>
          <button className="subworks-button" onClick={navigateToSignUp}>
            Get Started
          </button>
        </Box>
        <Box className="subworks-img-box">
          <img className="subworks-image" src="/img/ph1.png" />
        </Box>
      </Box>
    </div>
  );
}
