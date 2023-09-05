import React from "react";
import bannerImg from "../assets/img/ph.png";
import buttonImg from "../assets/img/wallpaper2.jpg";
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
      <div className="h-1/3 flex items-center justify-between mt-20">
        <div className={`${styles.sectionPar} m-10 w-1/2`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </div>
        <div className={`${styles.sectionPar} m-10 w-1/2`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </div>
      </div>
      <div className="h-2/5 flex items-end justify-center">
        <Button buttonProp={buttonImg} />
      </div>
    </section>
  );
};
