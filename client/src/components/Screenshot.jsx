import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg from "../assets/img/ph.png";
import buttonImg from "../assets/img/wallpaper2.jpg";
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
        <img src={buttonImg} alt="Screenshot 1" />
      </div>
      <div className="carousel-image">
        <img src={bannerImg} alt="Screenshot 2" />
      </div>
      <div className="carousel-image">
        <img src={buttonImg} alt="Screenshot 3" />
      </div>
    </Carousel>
  );
};
