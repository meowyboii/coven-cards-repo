import React from "react";
import bannerImg from "../assets/img/home_playnow.png";
import buttonImg from "../assets/img/button clean.png";
import witch from "../assets/img/dorothea.png";
import { styles } from "../style.js";

export const PlayNow = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section style={container} className="relative h-screen p-10">
      <div className="h-1/3 flex items-center justify-between mt-40 mb-0">
        <div
          className={`${styles.sectionTitle} m-10 w-1/2 text-left font-bold text-purplerest`}
        >
          Experience the
          <p className="text-purpler">Enchantment</p>
        </div>
        <img src={witch} className="justify-between w-[80vh] mt-[200px]"></img>
        <div
          className={`${styles.sectionTitle} m-10 w-1/2 text-right font-bold text-purplerest`}
        >
          Dabble in the
          <p className="text-purpler">Divisive</p>
        </div>
      </div>
      <button className="absolute left-[74vh] top-[70vh]">
        <div className="flex justify-center items-center w-[45vh]">
          <img src={buttonImg} className="button" alt="play-now button" />
          <p className="text">
            PLAY NOW
          </p>
        </div>
        <div className="glow w-[425px] h-[85px] bottom-[93px] left-[9px]">
              .
        </div>
      </button>
    </section>
  );
};
