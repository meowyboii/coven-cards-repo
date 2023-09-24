import React from "react";
import titleImg from "../assets/img/banner.png";
import { styles } from "../style.js";
import ReactCurvedText from "react-curved-text";

export const Description = () => {
  return (
    <div>
      <div className="bg-black h-screen p-10">
        <div className="flex items-center justify-center mt-0">
          <img src={titleImg} alt="master the mystery" className="w-1/2" />
          <div className="absolute text-[30px] text-purple font-bold">
            <ReactCurvedText
              width={600}
              height={300}
              cx={300}
              cy={230}
              rx={300}
              ry={100}
              startOffset={90}
              reversed={true}
              text="MASTER THE MYSTERY"
              textProps={{ style: { fontSize: 40, fill: "#A484A9" } }}
              textPathProps={null}
              tspanProps={null}
              ellipseProps={null}
              svgProps={null}
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
          </div>
          <div className="bg-slate-400 h-96 ml-5 w-1/2 px-5 ml-10 mr-5"></div>
        </div>
      </div>
    </div>
  );
};
