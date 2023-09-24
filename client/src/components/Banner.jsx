import React from "react";
import bannerImg from "../assets/img/home_banner.png";
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
              <img src={buttonImg} className="button" alt="play-now button" />
              <p className="text font-maintoo">
                PLAY NOW
              </p>
            </div>
            <div className="glow w-[385px] h-[80px] bottom-[85px] left-[4px]">
              .
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
