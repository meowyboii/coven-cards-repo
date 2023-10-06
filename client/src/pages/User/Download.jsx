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
      <div className="flex items-center justify-center w-[800px] bg-[#1E0523DF] p-10 relative rounded-3xl text-purple mt-[20vh] ml-[50vh] mr-[5vh] inline-block">
        <div className>

        </div>
        Coven Cards is a turn-based card-matching game set in a world of
        mythical creatures, wizards, and witches. You and your opponent are
        two spell-casters competing against each other in a potion-making
        contest—gathering as many ingredients as you can for your respective
        concoctions. Every card match is an ingredient obtained and added to
        the pot, so players must match as many cards as they can!
        <br></br>
        <br></br>
        Coven Cards takes card-matching to a whole new level, introducing
        magic into a casual game that is known and loved. Simple yet
        effective, it adds an element of competition in card-matching—making
        it a fun, addicting game that can be played anytime. Join the coven
        and test your luck and logic.
      </div>
    </div>
    </section>
  </Layout>;
};
