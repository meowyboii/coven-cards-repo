import React from "react";
import titleImg from "../assets/img/banner.png";
import { styles } from "../style.js";
import ReactCurvedText from "react-curved-text";

export const Description = () => {
  return (
    <div className="bg-black h-screen p-10">
      <div className="flex items-center justify-center mt-0">
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

      <div className="flex items-center justify-center  mt-10">
        <div className={`${styles.sectionPar} px-5 w-1/2 mr-5`}>
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
        <div className="trailer bg-purplerer h-96 ml-5 w-1/2 px-5 ml-10 mr-5"></div>
      </div>
    </div>
  );
};
