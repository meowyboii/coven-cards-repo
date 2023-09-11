import React from "react";
import bannerImg from "../assets/img/bg_game.png";
import buttonImg from "../assets/img/button clean.png";
import witch from "../assets/img/dorothea.png";
import { Button } from "./Button";
import { styles } from "../style.js";

export const PlayNow = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section style={container} className="relative h-screen p-10">
      <div className="h-1/3 flex items-center justify-between mt-20 mb-0">
        <div className={`${styles.sectionTitle} m-10 w-1/2 text-left font-bold text-purplerest`}>
          Experience the
          <p className="text-purpler">Enchantment</p>
        </div>
        <img src={witch} className="justify-between w-700"></img>
        <div className={`${styles.sectionTitle} m-10 w-1/2 text-right font-bold text-purplerest`}>
          Dabble in the
          <p className="text-purpler">Divisive</p>
        </div>
      </div>
      <div className="h-2/5 flex items-end justify-center">
        <Button buttonProp={buttonImg} />
      </div>
    </section>
  );
};
