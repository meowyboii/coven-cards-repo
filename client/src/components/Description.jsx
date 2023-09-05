import React from "react";
import titleImg from "../assets/img/wallpaper2.jpg";
import { styles } from "../style.js";

export const Description = () => {
  return (
    <div>
      <div className="bg-black h-screen p-10">
        <div className="flex items-center justify-center mt-10">
          <img src={titleImg} alt="master the mystery" className="w-1/4 " />
        </div>
        <div className="flex items-center justify-center  mt-10">
          <div className={`${styles.sectionPar} px-5 w-1/2 mr-5`}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
            maxime facere impedit repudiandae dolores fugiat quo doloribus
            quidem quibusdam nisi accusamus eaque aspernatur facilis neque
            labore, explicabo autem error voluptatibus, adipisci sequi! Nam
            rerum tenetur asperiores eum veritatis, non nihil debitis tempora
            dignissimos reprehenderit expedita voluptatum magnam omnis earum
            magni, at qui vitae ratione quod molestias praesentium laboriosam
            deserunt? Esse, aperiam ea! Molestias quam laboriosam, voluptate
            illo voluptas at deleniti eaque consequatur dolor.
          </div>
          <div className="bg-slate-400 h-96 ml-5 w-1/2 px-5 ml-10 mr-5"></div>
        </div>
      </div>
    </div>
  );
};
