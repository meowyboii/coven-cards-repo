import React from "react";
import bannerImg from "../assets/img/bg_menu.png";
import buttonImg from "../assets/img/button clean.png";
import { styles } from "../style.js";

export const Banner = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section style={container} className="relative h-screen p-10">
      <div className="h-auto mt-40 p-10 sm:w-full md:w-1/2">
        <p className={styles.sectionTitle}>
          The Coven beckons the magic from within...
        </p>
        <div className="mt-10 lg:w-1/2 md:w-48 sm:w-40 w-1/2 relative">
          <button>
            <p className="absolute text-[50px] text-purple font-bold z-10">PLAY NOW</p>
            <img src={buttonImg} alt="button"/>
          </button>
        </div>
      </div>
    </section>
  );
};
