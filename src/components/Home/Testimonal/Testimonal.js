import React, { useState } from "react";

import Carousel from "react-elastic-carousel";

import "./Testimonal.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  //   { width: 1200, itemsToShow: 4 },
];

function Testimonal() {
  const cards = [
    {
      image: "A",
      name: "Anto",
      description:
        "GiftBook has been a game-changer for me. I used to struggle with keeping track of all the gifts I received, but now, thanks to GiftBook, it's a breeze. I can easily record and organize every gift, and the reminders and notifications ensure I never miss expressing my gratitude. Highly recommended!",
      // clickEvent: sliderClick
    },
    {
      image: "N",
      name: "Nathira",
      description:
        "I absolutely love using GiftBook! It's such a convenient and user-friendly platform for managing my gift history. I can track all the gifts I've received, add personalized notes, and even generate reports. It has become an invaluable tool for preserving memories and appreciating the thoughtfulness of my loved ones.",
      // clickEvent: sliderClick
    },
    {
      image: "J",
      name: "Jeni",
      description:
        "GiftBook has simplified gift tracking for me. No more juggling between spreadsheets and sticky notes. With GiftBook, I have a centralized place to record all my gifts, categorize them by occasions, and easily search and filter through my gift history. It's a must-have tool for anyone who wants to stay organized and remember every special gift.",
      // clickEvent: sliderClick
    },
    {
      image: "N",
      name: "Nithin",
      description:
        "I can't imagine managing my gift registry without GiftBook. It's incredibly user-friendly and intuitive, allowing me to create a beautiful record of all the gifts I've received. The ability to add images and personalized notes makes it even more special. GiftBook has truly made gift tracking a delightful experience!",
      // clickEvent: sliderClick
    },
    {
      image: "J",
      name: "Jessi",
      description:
        "GiftBook is a lifesaver! As a busy professional, I struggled to keep track of the gifts I received. But GiftBook has simplified the entire process. I can easily enter the gift details, update their status, and even set reminders to express my appreciation. It's an efficient and well-designed tool that has made gift management effortless.",
      // clickEvent: sliderClick
    },
  ];

  return (
    <div className="carousel-container" id="testimonal">
      <h1 className="carousel-heading">Testimonials</h1>
      {/* <hr className="seperator" /> */}
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {cards.map((card) => {
            return (
              <div className="card swiper-slide">
                <div className="card-top">
                  <div className="card__image">
                    {card.image}
                    {/* <img src={card.image} alt="card image" /> */}
                  </div>
                </div>
                <div className="card__content">
                  <span className="card__name">{card.name}</span>
                  <p className="card__text">{card.description}</p>
                  {/* <button className="card__btn">View More</button> */}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
export default Testimonal;
