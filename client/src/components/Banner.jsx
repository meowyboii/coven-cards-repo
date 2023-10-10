import React from "react";
import bannerImg from "../assets/img/home_banner.png";
import buttonImg from "../assets/img/button clean.png";
import { styles } from "../style.js";
import { Link } from "react-router-dom";
import "animate.css";

export const Banner = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section
      style={container}
      className="relative h-screen p-10 animate__animated animate__fadeIn"
    >
      <div className="h-auto mt-40 p-10 sm:w-full md:w-1/2">
        <p
          className={`${styles.sectionTitle} animate__animated animate__fadeIn animate__delay-1s`}
        >
          The Coven beckons the magic from within...
        </p>
        <div className="animate__animated animate__bounce animate__delay-2s">
          <div className="mt-10 lg:w-[40vh] md:w-48 sm:w-40 w-1/2 glow ">
            <button>
              <div className="flex justify-center items-center ">
                <img
                  src={buttonImg}
                  className="button "
                  alt="play-now button"
                />
                <p className="text font-maintoo text-[50px]">
                  <Link to={"/download"}>PLAY NOW</Link>
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
