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
        <div className="mt-10 lg:w-[40vh] md:w-48 sm:w-40 w-1/2">
          <button>
            <div className="flex justify-center items-center">
              <img src={buttonImg} alt="play-now button" />
              <p className="font-bold absolute text-[40px] text-purple mt-10">
                PLAY NOW
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
