import React from "react";
import bannerImg from "../assets/img/home_playnow.png";
import buttonImg from "../assets/img/button clean.png";
import witch from "../assets/img/dorothea.png";
import { styles } from "../style.js";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

export const PlayNow = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section
      style={container}
      className="relative h-[100vh] p-10 overflow-hidden"
    >
      <div className="h-1/3 flex items-center justify-between mt-40 mb-0">
        <ScrollAnimation animateIn="fadeInLeft">
          <div
            className={`${styles.sectionTitle} m-10  text-left font-bold text-purplerest`}
          >
            Experience the
            <p className="text-purpler">Enchantment</p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
          <div className="h-[105vh] justify-between place-items-end mt-[27vh]">
            <img
              src={witch}
              alt="Dorothea the Great"
              className=" w-full h-full object-cover float2"
            />
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInRight">
          <div
            className={`${styles.sectionTitle} m-10 text-right font-bold text-purplerest `}
          >
            Dabble in the
            <p className="text-purpler ">Divisive</p>
          </div>
        </ScrollAnimation>
      </div>
      <ScrollAnimation animateIn="bounceIn">
        <div className="flex justify-center items-center z-10 glow w-1/4 left-[75vh] top-40 ">
          <button>
            <div className="flex justify-center items-center ">
              <img src={buttonImg} className="button" alt="play-now button" />
              <h2 className="text text-[55px] pb-3">
                <Link to={"/download"}>PLAY NOW</Link>
              </h2>
            </div>
          </button>
        </div>
      </ScrollAnimation>
    </section>
  );
};
