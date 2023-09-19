import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/img/__LOGO.png";
import { useAuth } from "../context/auth";
import toast, { Toaster } from "react-hot-toast";

export const MerchNavbar = () => {
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

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 shadow-lg bg-slate-600 w-full max-h-[14vh] shadow-lg bg-slate-800">
      <nav className="flex items-center justify-between mt-4">
        <ul className="flex justify-center items-center space-x-20 text-purple text-2xl font-bold">
          <NavLink to={"/"} className="rounded-lg px-3 py-2 text-slate-700 ">
            <img src={logoImg} alt="Logo" className="w-[250px] " />
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
                      className="inline-flex justify-center w-full px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
