import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/img/__LOGO.png";
import { useAuth } from "../context/auth";
import toast, { Toaster } from "react-hot-toast";
import profile from "../assets/img/mystery_man.png";

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
      <nav id="user" className="flex items-center justify-between">
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
                      className="inline-flex justify-center rounded-full hover:bg-gray-700 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <div className="bg-[#e5e7eb] rounded-full h-16 w-16">
                        {auth.user.photo ? (
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/auth/user-photo/${auth.user.id}`}
                            className="h-full w-full object-cover rounded-full"
                            alt="user"
                          />
                        ) : (
                          <img
                            src={profile}
                            className="h-full w-full object-cover rounded-full"
                            alt="no profile"
                          />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin/home" : "user"
                            }`}
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Dashboard
                          </NavLink>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700"
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
