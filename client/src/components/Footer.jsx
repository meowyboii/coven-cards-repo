import React from "react";
import logoImg from "../assets/img/__LOGO.png";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export const Footer = () => {
  return (
    <footer className="h-auto bg-black p-20">
      <div className="flex m-auto w-3/4 mb-[6vh]">
        <div className="logo w-1/3 flex items-center justify-center">
          <Link to={"/"}>
            <img src={logoImg} alt="Logo" style={{ width: 310 }}></img>
          </Link>
        </div>
        <div className="w-1/3 ml-[20vh]">
          <div className="text-purple font-main py-5">
          <h1 className="text3 text-xl">Socials </h1>
          <h1 className="text-lg flex justify-start items-center"><IoIosArrowForward /><a className="leenk" href="https://www.facebook.com/coven.cards">Facebook</a></h1>
          <h1 className="text-lg flex justify-start items-center"><IoIosArrowForward /><a className="leenk" href="https://www.twitter.com/coven-cards">Twitter</a></h1>
          </div>
        </div>
        <div className="w-1/3">
          <div className="text-purple justify-center font-main py-5">
          <h1 className="text3 text-xl">Navigation </h1>
          <h1 className="text-lg flex justify-start items-center"><IoIosArrowForward /><Link className="leenk" to={"/"}>Home</Link></h1>
          <h1 className="text-lg flex justify-start items-center"><IoIosArrowForward /><Link className="leenk" to={"/download"}>Download</Link></h1>
          <h1 className="text-lg flex justify-start items-center"><IoIosArrowForward /><Link className="leenk" to={"/merch"}>Merch</Link></h1>
          </div>
        </div>
      </div>
      <div className="text-purplerer font-main flex justify-center m-auto">
            <h2>Copyright 2023 Etits Games. All Rights Reserved</h2>
      </div>
    </footer>
  );
};
