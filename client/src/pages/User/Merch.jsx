import React from "react";
import { Products } from "./Products";
import { LayoutMerch } from "../../components/LayoutMerch";
import banner from "../../assets/img/merch_banner.png";
import bannerImg from "../../assets/img/home_playnow.png";

export const Merch = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <LayoutMerch>
      <div>
        <img src = {banner}></img>
      </div>
      {/*<div className="flex justify-items-center align-items-center">
        <img src = {banner} className="h-[427px]"></img><img src = {banner} className="h-[427px]"></img>
      </div> --if gusto mo yung two banner*/}
      <section style={container} className="relative h-screen p-100">
      <div className="px-5">
        <Products />
      </div>
      </section>
    </LayoutMerch>
  );
};
