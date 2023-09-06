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
      description:
        "Capture and cherish every gift that comes your way on your birthday with GiftBook.",
      // clickEvent: sliderClick
    },
    {
      image: "/img/wedding.png",
      title: "Wedding",
      description:
        "Preserve the love and generosity of your wedding guests with GiftBook. A timeless keepsake of your cherished gifts.",
      // clickEvent: sliderClick
    },
    {
      image: "/img/housing.png",
      title: "House Warming",
      description:
        "Remember the love, treasure the gifts. GiftBook helps you honor the generosity of your housewarming guests",
      // clickEvent: sliderClick
    },
    {
      image: "/img/betrothal.png",
      title: "Baby Shower",
      description: "This is a fourth description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/house.png",
      title: "Naming Ceremony",
      description: "This is a fifth description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/engage.png",
      title: "Home Function",
      description: "This is a sixth description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/birthday.png",
      title: "Birthday",
      description: "This is a seventh description",
      // clickEvent: sliderClick
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
