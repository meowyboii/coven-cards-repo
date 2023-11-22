import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/img/sale1.png";
import banner2 from "../assets/img/sale2.png";
import "./Screenshot.css";
import { Link } from "react-router-dom";

export const Screenshot = () => {
  return (
    <section className="relative h-screen bg-gradient-to-b from-[#0e0014] to-black">
      <div className="flex justify-items-center align-items-center">
        <Link to={"/merch/sale"}>
          <img
            src={banner1}
            alt="Merch on sale"
            className="rounded-3xl h-[900px] opacity-60 mt-10 ml-[20px] transition-transform transform scale-90 hover:scale-95 duration-700"
          />
        </Link>
        <Link to={"/merch/new-arrivals"}>
          <img
            src={banner2}
            alt="New arrival merch"
            className="rounded-3xl h-[900px] opacity-60 mt-10 ml-[20px] transition-transform transform scale-90 hover:scale-95 duration-700"
          />
        </Link>
      </div>
    </section>
  );
};
