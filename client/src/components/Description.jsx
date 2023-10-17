import React from "react";
import titleImg from "../assets/img/banner.png";
import { styles } from "../style.js";
import ReactCurvedText from "react-curved-text";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css";
import trailerVideo from "../assets/videos/Trailer.mp4";

export const Description = () => {
  return (
    <div className="bg-black h-screen px-10">
      <ScrollAnimation animateIn="fadeIn">
        <div className="flex items-center justify-center mt-0 float">
          <img src={titleImg} alt="master the mystery" className="w-1/2" />
          <div className="text">
            <ReactCurvedText
              width="500"
              height="450"
              cx="575"
              cy="429"
              rx="426"
              ry="470"
              startOffset="-10"
              reversed={true}
              text="MASTER THE MYSTERY"
              textProps={{
                style: {
                  fontSize: "40",
                  filter: "drop-shadow(0px 0px 2px #580E67)",
                  filter: "drop-shadow(0px 0px 5px #580E67)",
                },
              }}
              textPathProps={{ fill: "#A484A9" }}
              tspanProps={{ dy: "0" }}
              ellipseProps={null}
              svgProps={{ style: { transform: "rotate(63deg)" } }}
            />
          </div>
        </div>
      </ScrollAnimation>

      <div className="flex items-center justify-center  mt-10 ">
        <div className={`${styles.sectionPar} px-5 w-1/2 mr-5 text-purple`}>
          <ScrollAnimation animateIn="fadeInLeft">
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
          </ScrollAnimation>
        </div>

        <div className="w-1/2">
          <ScrollAnimation animateIn="fadeInRight">
            <div className="trailer bg-purplerer h-auto w-auto ml-10 mr-5">
              <video controls loop autoPlay muted>
                <source src={trailerVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};
