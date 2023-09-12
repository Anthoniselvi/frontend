import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "./Services.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const ServicesSlick = () => {
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: 0, // Adjust the padding to create space between slides
    slidesToShow: 5, // Display five slides
    speed: 500,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
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
  ];

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div id="services" className="services-container">
      <h1 className="services-heading">Giftbook for any occasion</h1>
      <div className="services-wrapper">
        <Slider {...settings} ref={sliderRef}>
          {items.map((item) => (
            <div className="services-slider-item" key={item.title}>
              <div className="services-slider-container">
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
            </div>
          ))}
        </Slider>
        <div className="center-slide-buttons">
          <button className="prev-button" onClick={handlePrevClick}>
            <AiOutlineArrowLeft />
          </button>
          <button className="next-button" onClick={handleNextClick}>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSlick;
