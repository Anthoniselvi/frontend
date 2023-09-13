import React, { useState, useEffect } from "react";
import "./About.css";
import layout1 from "../../../img/without-bg.png";
import layout2 from "../../../img/about-mob.png";
import { useMediaQuery } from "@mui/material";

export default function About() {
  //   const phImagePath = "/img/layout1.png";
  const [showBackground, setShowBackground] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth >= 820);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="about-container" id="about">
      {showBackground && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ width: "100vw" }}
        >
          <path
            style={{ width: "100vw", height: "100vh" }}
            fill="#DA344D"
            d="M0,256L1440,128L1440,0L0,0Z"
          />
        </svg>
      )}
      <div className="image-container">
        {isMobile ? (
          <img src={layout2} alt="display" width="100%" />
        ) : (
          <img src={layout1} alt="display" />
        )}
      </div>
    </div>
  );
}
