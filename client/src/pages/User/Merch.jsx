import React from "react";
import { Products } from "./Products";
import { LayoutMerch } from "../../components/LayoutMerch";
import banner from "../../assets/img/merch_banner.png";

export const Merch = () => {
  return (
    <LayoutMerch>
      <div>
        <img src={banner}></img>
      </div>
      {/*<div className="flex justify-items-center align-items-center">
        <img src = {banner} className="h-[427px]"></img><img src = {banner} className="h-[427px]"></img>
      </div> --if gusto mo yung two banner*/}
      <div className="px-5 w-full h-full h-auto bg-gradient-to-b from-black to-[#0e0014]">
        <Products />
      </div>
    </LayoutMerch>
  );
};
