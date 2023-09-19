import React from "react";
import { NavLink } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const AdminMenu = () => {
  return (
    <div className="text-white p-4 w-1/6">
      <div>
        <h2 className="text-2xl font-bold mb-4 ">Admin Menu</h2>
        <ul className="space-y-2 ">
          <li className="border-2">
            <NavLink
              to={"/dashboard/admin/create-category"}
              className="block hover:bg-gray-700 px-2 py-1 rounded active:bg-black"
            >
              Create Category
            </NavLink>
          </li>
          <li className="border-2">
            <NavLink
              to={"/dashboard/admin/create-product"}
              className="block hover:bg-gray-700 px-2 py-1 rounded active:bg-black"
            >
              Create Product
            </NavLink>
          </li>
          <li className="border-2">
            <NavLink
              to={"/dashboard/admin/users"}
              className="block hover:bg-gray-700 px-2 py-1 rounded active:bg-black"
            >
              Manage Users
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
