import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sc1 from "../assets/img/sc1.png";
import sc2 from "../assets/img/sc2.png";
import sc3 from "../assets/img/sc3.png";
import "./Screenshot.css";

export const Screenshot = () => {
  return (
    <Carousel
      transitionTime={1000}
      showThumbs={false}
      showStatus={false}
      emulateTouch
      autoPlay={true}
      interval={5000}
      infiniteLoop={true}
    >
      <div className="carousel-image">
        <img src={sc1} alt="Screenshot 1" />
      </div>
      <div className="carousel-image">
        <img src={sc2} alt="Screenshot 2" />
      </div>
      <div className="carousel-image">
        <img src={sc3} alt="Screenshot 3" />
      </div>
    </Carousel>
  );
};
