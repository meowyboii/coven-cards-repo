import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import bannerImg from "../../assets/img/login_bg.png";
import buttonImg from "../../assets/img/button clean.png";
import logoImg from "../../assets/img/__LOGO.png";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const Login = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };
  useEffect(() => {
    if(auth?.user){
      if(auth?.user?.role === 1){
        navigate("/dashboard/admin/create-category");
      }
       else{
        navigate(location.state || "/");
      }
    }
  }, [auth]);

  return (
    <Layout>
      <div
        className="flex items-center justify-center h-screen p-10"
        style={container}
      >
        <div className="flex justify-center mt-28">
          <div className="absolute w-[40vh] top-[15vh] z-10 ">
            <img src={logoImg} alt="coven cards logo" />
          </div>

          <div className="bg-[#1E0523DF] p-10 relative rounded-3xl w-[45vh] text-purple ">
            <form onSubmit={handleSubmit}>
              <h1 className="mt-16 text-3xl text-center font-bold font-maintoo mb-4">
                Enter your login credentials
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-xl font-medium font-main mb-2"
                >
                  email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 font-main border border-purpler rounded focus:outline-none focus:border-purplerer text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-xl font-medium font-main mb-2"
                >
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 font-main border border-purpler rounded focus:outline-none focus:border-purplerer text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-[17px] font-main">Remember Me</span>
                </label>
              </div>
              <br></br>
              <div>
                <button
                  type="submit"
                  className="opacity-90 hover:opacity-100 text-white font-bold py-2 px-4 rounded mx-[20px]"
                >
                  <div className="flex justify-center items-center">
                    <img src={buttonImg} alt="login button" />
                    <p className="text absolute text-[40px] text-purple mt-8">
                      LOGIN
                    </p>
                  </div>
                </button>
                <br></br>
                <br></br>
                <br></br>
                <div className="flex items-center text-center justify-center">
                  <div className="text-[17px] font-main">No Account?</div>
                  <Link
                    to={"/register"}
                    className="text-[17px] text-[#92509C] ml-1 font-main font-bold"
                  >
                    {" "}
                    Create one!
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};
