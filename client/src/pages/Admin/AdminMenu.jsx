import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
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
    <div className="bg-[#1E0523bd] relative w-[70vh] min-h-[75vh] pt-5 text-purple flex justify-center">
      <div className="text-white p-4 w-4/5">
        <div>
          <NavLink
                to={"/dashboard/admin"}
          >
          <div className="mb-5">
            <img src={logoImg} alt="coven cards logo" />
          </div>
          </NavLink>
          <br></br>
          <h2 className="text2 text-4xl font-bold mb-7 text-center">
            ADMIN MENU
          </h2>

          <ul className="space-y-5 ">
            <li className="border-2 border-purpler rounded">
              <NavLink
                to={"/dashboard/admin/create-category"}
                className="block hover:bg-pink-900 px-2 py-1 rounded active:bg-black"
              >
                <div className="flex justify-center text-2xl">
                  Create Category
                </div>
              </NavLink>
            </li>
            <li className="border-2 border-purpler rounded">
              <NavLink
                to={"/dashboard/admin/create-product"}
                className="block hover:bg-pink-900 px-2 py-1 rounded active:bg-black"
              >
                <div className="flex justify-center text-2xl">
                  Create Product
                </div>
              </NavLink>
            </li>
            <li className="border-2 border-purpler rounded">
              <NavLink
                to={"/dashboard/admin/manage-product"}
                className="block hover:bg-pink-900 px-2 py-1 rounded active:bg-black"
              >
                <div className="flex justify-center text-2xl">
                  Manage Product
                </div>
              </NavLink>
            </li>
            <li className="border-2 border-purpler rounded">
              <NavLink
                onClick={handleLogout}
                to={"/login"}
                className="block hover:bg-pink-900 px-2 py-1 rounded active:bg-black"
              >
                <div className="flex justify-center text-2xl">Logout</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
