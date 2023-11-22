import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { BiLogOut } from 'react-icons/bi';
import { BiStoreAlt } from 'react-icons/bi';
import { BiLayer } from "react-icons/bi";
import { MdFavoriteBorder } from 'react-icons/md';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { AiOutlineAppstore } from 'react-icons/ai';
import logoImg from "../../assets/img/__LOGO.png";

export const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div className="bg-[#D4C1DB] relative w-[70vh] min-h-[75vh] pt-5 font-main text-purple flex justify-center">
      <div className="text-white p-4 w-4/5">
        <div>
          <div className="mb-5">
            <img src={logoImg} alt="coven cards logo" />
          </div>
          <br></br>
          <h2 className="font-main text-2xl mb-7 text-[#343434]">
            Home
          </h2>
          <ul className="space-y-5 font-main text-[#343434]">
            <li className="rounded">
              <NavLink
                to={"/dashboard/admin/home"}
                style={({isActive})=>{return{background: isActive?'#92509C':'', color: isActive?'white':''}}}
                className="block hover:bg-purplerest hover:text-white text-[#343434] px-2 py-1 rounded"
              >
                <div className="flex items-center ml-[2vh] text-2xl">
                  <AiOutlineAppstore className="mr-[5vh]"/> Dashboard
                </div>
              </NavLink>
            </li>
          </ul>
          <br/>
          <br/>
          <h2 className="font-main text-2xl mb-7 text-[#343434]">
            Store Details
          </h2>

          <ul className="space-y-5 font-main text-[#343434]">
            <li className="rounded">
              <NavLink
                to={"/dashboard/admin/create-category"}
                style={({isActive})=>{return{background: isActive?'#92509C':'', color: isActive?'white':''}}}
                className="block hover:bg-purplerest hover:text-white text-[#343434] px-2 py-1 rounded"
              >
                <div className="flex items-center ml-[2vh] text-2xl">
                  <BiLayer className="mr-[5vh]"/> Create Category
                </div>
              </NavLink>
            </li>
            <li className="rounded">
              <NavLink
                to={"/dashboard/admin/create-product"}
                style={({isActive})=>{return{background: isActive?'#92509C':'', color: isActive?'white':''}}}
                className="block hover:bg-purplerest hover:text-white text-[#343434] px-2 py-1 rounded"
              >
                <div className="flex items-center ml-[2vh] text-2xl">
                <MdOutlineProductionQuantityLimits className="mr-[5vh]"/> Create Product
                </div>
              </NavLink>
            </li>
            <li className="rounded">
              <NavLink
                to={"/dashboard/admin/manage-product"}
                style={({isActive})=>{return{background: isActive?'#92509C':'', color: isActive?'white':''}}}
                className="block hover:bg-purplerest hover:text-white text-[#343434]  px-2 py-1 rounded"
              >
                <div className="flex items-center ml-[2vh] text-2xl">
                <BiStoreAlt className="mr-[5vh]"/> Manage Product
                </div>
              </NavLink>
            </li>
            <li className="rounded">
              <NavLink
                to={"/dashboard/admin/manage-order"}
                style={({isActive})=>{return{background: isActive?'#92509C':'', color: isActive?'white':''}}}
                className="block hover:bg-purplerest hover:text-white text-[#343434]  px-2 py-1 rounded"
              >
                <div className="flex items-center ml-[2vh] text-2xl">
                <MdFavoriteBorder className="mr-[5vh]"/> Manage Order
                </div>
              </NavLink>
            </li>
            <br/>
            <br/>
            <br/>
            <li className="rounded">
              <NavLink
                onClick={handleLogout}
                to={"/login"}
                style={({isActive})=>{return{background: isActive?'#92509C':'', color: isActive?'white':''}}}
                className="block hover:bg-purplerest hover:text-white text-[#343434] px-2 py-1 rounded"
              >
                <div className="flex items-center ml-[2vh] text-2xl">
                <BiLogOut className="mr-[5vh]"/> Logout
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};