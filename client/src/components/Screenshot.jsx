import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/img/sale1.png";
import banner2 from "../assets/img/sale2.png";
import "./Screenshot.css";

export const Screenshot = () => {
  return (
    <section className="relative h-screen bg-gradient-to-b from-[#0e0014] to-black">
    <div className="">
      <div className="flex justify-items-center align-items-center">
        <img src = {banner1} className="rounded-3xl h-[900px] opacity-60 mt-10 ml-[20px]"></img><img src = {banner2} className="rounded-3xl h-[900px] opacity-60 mt-10 ml-[20px]"></img>
      </div>
    </div>
    </section>
  );
};
