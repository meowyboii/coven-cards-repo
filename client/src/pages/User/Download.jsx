import React from "react";
import { Layout } from "../../components/Layout";
import buttonImg from "../../assets/img/button clean.png";
import bannerImg from "../../assets/img/login_bg.png";
import { Cart } from "./Cart";

export const Download = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return <Layout>
    <section style={container} className="relative h-screen p-10">
    <div className="p-10"> hi </div>
    <div className="left-[20vh] mt-[20vh] lg:w-[40vh] md:w-48 sm:w-40 w-1/2 glow">
      <a href="../assets/download/coven-cards-installer-1.0.3.exe" download><button>
          <div className="flex justify-center items-center ">
            <img src={buttonImg} className="button" alt="play-now button" />
            <p className="text font-maintoo text-[43px]">DOWNLOAD
            COVEN CARDS</p>
          </div>
        </button></a>
    </div>
    </section>
  </Layout>;
};
