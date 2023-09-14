import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";

import "./Services.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Services() {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const items = [
    {
      image: "/img/birthday.png",
      title: "Birthday",
      description: "Celebrate special moments with thoughtful gifts.",
    },
    {
      image: "/img/wedding.png",
      title: "Wedding",
      description: "Cherish love and commitment with meaningful presents.",
    },
    {
      image: "/img/housing.png",
      title: "House Warming",
      description:
        "Turn a new house into a warm and welcoming home with housewarming gifts.",
    },
    {
      image: "/img/betrothal.png",
      title: "Baby Shower",
      description: "Welcome a bundle of joy with adorable gifts.",
    },
    {
      image: "/img/house.png",
      title: "Naming Ceremony",
      description:
        "Mark the beginning of a beautiful name with heartfelt tokens.",
    },
    {
      image: "/img/engage.png",
      title: "Home Function",
      description:
        "Turn a new house into a warm and welcoming home with housewarming gifts.",
    },
  ];

  return (
    <div id="services" className="services-container">
      <h1 className="services-heading">Giftbook for any occassion</h1>
      {/* <hr className="seperator" /> */}
      <div className="services-wrapper">
        <Carousel breakPoints={breakPoints}>
          {items.map((item) => (
            <div className="services-slider-container" key={item.title}>
              <img
                className="services-image"
                src={item.image}
                alt={item.title}
              />
              <div className="services-text">
                <p className="services-title">{item.title}</p>
                <p className="services-description">{item.description}</p>
              </div>
              <div className="services-btn-box">
                <button className="services-btn" onClick={navigateToSignUp}>
                  Create Event
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default Services;
