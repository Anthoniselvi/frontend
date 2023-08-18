import React from "react";
// import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  //   const navigate = useNavigate();

  const navigateToLogin = () => {
    // navigate("/login");
  };
  return (
    <div className="footer-container" id="footer">
      <div className="footer-inner">
        <div className="footer-leftcolumn">
          <h1>MOI APP</h1>
          <h3>Made Easy</h3>
        </div>
        <div className="footer-rightcolumn">
          <div className="footer-secondcolumn">
            <h2 className="footer-subhead">About Moi-App</h2>
            <h3
              className="footer-bottom-text"
              onMouseEnter={(e) => {
                e.target.style.color = "#50bcd9";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#fff";
              }}
            >
              Events
            </h3>
            <h3
              className="footer-bottom-text"
              onMouseEnter={(e) => {
                e.target.style.color = "#50bcd9";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#fff";
              }}
            >
              Ecards
            </h3>
          </div>
          <div className="footer-thirdcolumn">
            <h2 className="footer-subhead">Help</h2>
            <h3
              className="footer-bottom-text"
              onMouseEnter={(e) => {
                e.target.style.color = "#50bcd9";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#fff";
              }}
            >
              Contact Us
            </h3>
            <h3
              className="footer-bottom-text"
              onMouseEnter={(e) => {
                e.target.style.color = "#50bcd9";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#fff";
              }}
            >
              FAQ
            </h3>
          </div>
          <div className="footer-outer-button">
            <button className="footer-button" onClick={navigateToLogin}>
              Login
            </button>
            <button className="footer1-button" onClick={navigateToLogin}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
