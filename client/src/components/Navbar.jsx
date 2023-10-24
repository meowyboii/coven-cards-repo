import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/img/__LOGO.png";
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full absolute z-10 position">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center space-x-20 text-purple text-2xl font-bold">
          <NavLink
            to={"/"}
            className="rounded-lg px-3 py-2 text-slate-700  hover:text-slate-900 mx-10"
          >
            <img
              src={logoImg}
              className="img"
              alt="Logo"
              style={{ width: 310 }}
            ></img>
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
          <li className="flex items-center pl-[76vh]">
            {!auth.user ? (
              <>
                <NavLink to={"/login"}>Log in</NavLink>
              </>
            ) : (
              <>
                <div className="hidden md:block" onClick={toggleDropdown}>
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#1E0523bd] hover:scale-110 duration-300 inline-flex justify-center w-full px-4 py-2 rounded-md focus:outline-none"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      {auth?.user?.firstName}
                    </button>

                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Dashboard
                          </NavLink>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Logout
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
      <Toaster />
    </div>
  );
};
