import React from "react";
import { NavLink } from "react-router-dom";
import { Login } from "../pages/Login";

export const Navbar = () => {
  return (
    <div className="w-full absolute z-10">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center space-x-10 ">
          <NavLink
            to={"/"}
            className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 mx-10"
          >
            Logo
          </NavLink>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/download"}>Download</NavLink>
          </li>
          <li>
            <NavLink to={"/merch"}>Merch</NavLink>
          </li>
        </ul>

        <NavLink
          to={"/login"}
          className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 mx-10"
        >
          Login
        </NavLink>
      </nav>
    </div>
  );
};
