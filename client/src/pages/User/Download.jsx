import React from "react";
import Snowfall from "react-snowfall";
import { Layout } from "../../components/Layout";
import buttonImg from "../../assets/img/button clean.png";
import bannerImg from "../../assets/img/dlpage.jpg";
import cardImg from "../../assets/img/bg_game.png";
import ScrollAnimation from "react-animate-on-scroll";

export const Download = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "saturate(60%)",
  };
  return (
    <Layout>
      <section
        style={container}
        className="relative h-screen p-10 overflow-hidden"
      >
        <div className="flex items-center justify-center mt-[8vh] inline-block">
          <ScrollAnimation animateIn="fadeInLeft">
            <div className="left-[15vh] mt-[25vh] lg:w-[50vh] md:w-48 sm:w-40 w-1/2 glow2">
              <a
                href="coven-cards-installer-1.0.3.exe"
                download="coven-cards-installer-1.0.3.exe"
              >
                <button className="w-full h-full hover:text-red-500">
                  <div className="flex justify-center items-center">
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
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInRight">
            <div className="flex items-center w-[800px] h-[400px] bg-[#1E0523DF] p-10 relative rounded-3xl text-purple mt-[20vh] ml-[50vh] mr-[5vh] inline-block float">
              <div className="card-header">
                <h2 className="text2 font-maintoo text-[43px]">
                  DOWNLOAD & INSTALLATION
                </h2>
              </div>
              <ol className="list-decimal list-outside text-[24px] mx-[3vh] mt-[10vh] pt-10 text-[#d7badb]">
                <li className="font-main ">
                  {" "}
                  Click the download link for the Coven Cards Installer.
                </li>
                <br></br>
                <li className="font-main "> Launch the installer.</li>
                <br></br>
                <li className="font-main ">
                  {" "}
                  After installation, launch the 'CovenCards.exe' file.
                </li>
                <br></br>
                <li className="font-main "> Play and Enjoy!</li>
              </ol>
            </div>
          </ScrollAnimation>
        </div>
        <Snowfall color="#A484A9CB" snowflakeCount={20} />
        <Snowfall color="#f14ad0C2" snowflakeCount={20} />
      </section>
    </Layout>
  );
};
