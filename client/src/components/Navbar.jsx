import React from "react";
import { NavLink } from "react-router-dom";

import logoImg from "../assets/img/__LOGO.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast, { Toaster } from "react-hot-toast";

export const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="w-full absolute z-10 position">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center space-x-20 text-purple text-2xl font-bold">
          <Link
            to={"/"}
            className="rounded-lg px-3 py-2 text-slate-700  hover:text-slate-900 mx-10"
          >
            <img src={logoImg} alt="Logo" style={{ width: 310 }}></img>
          </Link>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/download"}>Download</NavLink>
          </li>
          <li>
            <NavLink to={"/merch"}>Merch</NavLink>
          </li>
          <li className="flex items-center pl-[76vh]">
            {!auth.user ? (
              <>
                <NavLink to={"/login"}>Login</NavLink>
              </>
            ) : (
              <>
                <NavLink onClick={handleLogout} to={"/login"}>
                  Logout
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </nav>
      <Toaster />
    </div>
  );
};
