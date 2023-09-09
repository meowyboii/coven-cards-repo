import React from "react";
import bannerImg from "../assets/img/ph.png";
import buttonImg from "../assets/img/wallpaper2.jpg";
import { Button } from "./Button";
import { styles } from "../style.js";

export const Banner = () => {
  const container = {
    backgroundImage: `url(${buttonImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section style={container} className="relative h-screen p-10">
      <div className="bg-black h-auto mt-40 p-10 sm:w-full md:w-1/2">
        <p className={styles.sectionTitle}>
          The Coven beckons the magic from within... TESTISDHFSHDFUHS
        </p>
        <div className="mt-10">
          <Button buttonProp={buttonImg} />
        </div>
      </div>
    </section>
  );
};
