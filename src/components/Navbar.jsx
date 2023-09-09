import React from "react";
import logoImg from "../assets/img/__LOGO.png";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="w-full absolute z-10 position">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center space-x-10 text-[purple]">
          <Link
            to={"/"}
            className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 mx-10"
          >
            <img src={logoImg} alt = "Logo" style={{width: 310}}></img>
          </Link>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/download"}>Download</Link>
          </li>
          <li>
            <Link to={"/merch"}>Merch</Link>
          </li>
        </ul>

        <Link
          to={"/"}
          className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 mx-10"
        >
          Sign Up
        </Link>
      </nav>
    </div>
  );
};
