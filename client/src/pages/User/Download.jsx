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
    <div className="flex items-center justify-center  mt-10 inline-block">
      <div className="left-[5vh] mt-[25vh] lg:w-[40vh] md:w-48 sm:w-40 w-1/2 glow">
        <a href="../assets/download/coven-cards-installer-1.0.3.exe" download><button>
            <div className="flex justify-center items-center ">
              <img src={buttonImg} className="button" alt="play-now button" />
              <p className="text font-maintoo text-[43px]">DOWNLOAD
              COVEN CARDS</p>
            </div>
          </button></a>
      </div>
      <div className="flex items-center justify-center w-[800px] h-[400px] bg-[#1E0523DF] p-10 relative rounded-3xl text-purple mt-[20vh] ml-[50vh] mr-[5vh] inline-block">
        <div className="card-header">
          <h2 className = "text font-maintoo text-[40px]">DOWNLOAD & INSTALLATION</h2>
        </div>
        <ol className="list-decimal list-outside text-[20px] font-bold">
          <li>Click the download link for the Coven Cards Installer.</li>
          <br></br>
          <li>Launch the installer.</li>
          <br></br>
          <li>Follow the steps on the installer.</li>
        </ol>
      </div>
    </div>
    </section>
  </Layout>;
};
