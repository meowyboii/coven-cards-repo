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
  return (
    <Layout>
      <section style={container} className="relative h-screen p-10">
        <div className="flex items-center justify-center  mt-10 inline-block">
          <div className="left-[15vh] mt-[25vh] lg:w-[50vh] md:w-48 sm:w-40 w-1/2 glow">
            <a
              href="../assets/download/coven-cards-installer-1.0.3.exe"
              download
            >
              <button className="w-full h-full hover:text-red-500">
                <div className="flex justify-center items-center ">
                  <img
                    src={buttonImg}
                    className="button w-[1000px] h-[100px]"
                    alt="play-now button"
                  />
                  <p className="text font-maintoo text-[40px] mb-[9vh]">
                    DOWNLOAD
                  </p>
                  <p className="text font-maintoo text-[35px] mb-[1vh]">
                    COVEN CARDS
                  </p>
                </div>
              </button>
            </a>
          </div>
          <div className="flex items-center w-[800px] h-[400px] bg-[#1E0523DF] p-10 relative rounded-3xl text-purple mt-[20vh] ml-[50vh] mr-[5vh] inline-block">
            <div className="card-header">
              <h2 className="text font-maintoo text-[43px]">
                DOWNLOAD & INSTALLATION
              </h2>
            </div>
            <ol className="list-decimal list-outside text-[20px] font-bold mx-[3vh] mt-[10vh]">
              <li className="font-maintoo text-[28px]"> Click the download link for the Coven Cards Installer.</li>
              <br></br>
              <li className="font-maintoo text-[28px]"> Launch the installer.</li>
              <br></br>
              <li className="font-maintoo text-[28px]"> After Installation, Launch the 'CovenCards.exe' File</li>
              <br></br>
              <li className="font-maintoo text-[28px]"> Play and Enjoy!</li>
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
};
