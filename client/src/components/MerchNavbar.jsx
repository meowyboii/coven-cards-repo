import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/img/__LOGO.png";
import { useAuth } from "../context/auth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { SearchInput } from "./SearchInput";
import { Cart } from "../pages/User/Cart";
import profile from "../assets/img/mystery_man.png";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activateDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //Get categories
  const [categories, setCategories] = useState([]);
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 shadow-lg w-full max-h-[14vh] shadow-lg bg-black z-10 ">
      <nav className="flex items-center justify-between mt-4">
        <ul className="flex justify-center items-center space-x-16 text-purple text-2xl font-bold">
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
            <div
              className="relative inline-block py-2"
              onMouseEnter={activateDropdown}
              onMouseLeave={activateDropdown}
            >
              <NavLink to={"/merch"}>Merch▼</NavLink>
              {isDropdownOpen && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-lg py-2 px-4 rounded-md w-auto font-normal">
                  <ul>
                    {categories.map((c) => (
                      <>
                        <li>
                          <NavLink to={`/merch/category/${c.slug}`}>
                            {c.name}
                          </NavLink>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
          <li>
            <SearchInput />
          </li>
          <div className="pl-20">
            <Cart />
          </div>

          <li className="flex items-center space-x-0">
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
