import React from "react";
// import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function FirstPage() {
  //   const navigate = useNavigate();

  const navigateToSignUp = () => {
    // navigate("/signup");
  };
  return (
    <div className="firstpage-container" id="home">
      <div className="home-text-section">
        <h1 className="primary-heading">Gift Management made easy</h1>
        <p className="primary-text">
          GiftBook is the easiest way to record all the gifts you receive for
          your birthday, wedding, housewarming, and more.
        </p>
        <button onClick={navigateToSignUp} className="secondary-button">
          Get Started
        </button>
      </div>
    </div>
  );
}
