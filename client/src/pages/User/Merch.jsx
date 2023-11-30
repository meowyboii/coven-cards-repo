import React, { useEffect } from "react";
import { Products } from "./Products";
import { LayoutMerch } from "../../components/LayoutMerch";
import banner from "../../assets/img/merch_banner.png";
import { Link } from "react-router-dom";
import ScrollButton from "../../components/ScrollButton";
import { motion } from 'framer-motion';

export const Merch = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInVariants}
    transition={{ duration: 1 }}
    >
    <LayoutMerch>
      <div>
        <Link to={"/merch/product/Coven-Cards-Collection-2"}>
          <img src={banner} alt="Coven Cards Deck is here"></img>
        </Link>
      </div>
      {/*<div className="flex justify-items-center align-items-center">
        <img src = {banner} className="h-[427px]"></img><img src = {banner} className="h-[427px]"></img>
      </div> --if gusto mo yung two banner*/}
      <div className="px-5 w-full h-full h-auto bg-gradient-to-b from-black to-[#0e0014]">
        <Products />
      </div>
      <ScrollButton />
    </LayoutMerch>
    </motion.div>
  );
};
