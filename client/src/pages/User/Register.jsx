import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import bannerImg from "../../assets/img/login_bg.png";
import buttonImg from "../../assets/img/button clean.png";
import logoImg from "../../assets/img/__LOGO.png";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";

export const Register = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    dateOfBirth: "",
    parentEmail: "",
    parentContact: "",
  });

  const navigate = useNavigate();

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
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div
        className="flex items-center justify-center h-screen p-10"
        style={container}
      >
        <img
          src={logoImg}
          alt="coven cards logo"
          className="absolute w-1/5 z-10 top-[18vh]"
        />
        <div className="bg-[#1E0523DF] p-10  rounded-3xl text-purple mt-[15vh]">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold font-maintoo mb-4 mt-16 mb-10">
              Create your Coven Cards Account
            </h1>
            <br></br>
            <div className="inline-flex justify-center">
              <div className="mr-5">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block font-medium font-main mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block font-medium font-main mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block font-medium font-main mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="sample@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block font-medium font-main mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                  />
                </div>
              </div>
              <div className="ml-5">
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block font-medium font-main mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dateOfBirth"
                    className="block font-medium font-main mb-2"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="parentEmail"
                      className="block font-medium mb-2 font-main"
                    >
                      Parent Email
                    </label>
                    <input
                      type="text"
                      id="parentEmail"
                      name="parentEmail"
                      placeholder="sample@gmail.com"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="parentContact"
                      className="block font-medium mb-2 font-main"
                    >
                      Parent Contact
                    </label>
                    <input
                      type="tel"
                      pattern="[0-9]{11}"
                      placeholder="0XXX-XXX-YYYY"
                      id="parentContact"
                      name="parentContact"
                      value={formData.parentContact}
                      onChange={handleChange}
                      className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="font-bold py-2 px-4 rounded">
                  <div className="flex justify-center items-center w-[28vh]">
                    <img src={buttonImg} alt="login button" />
                    <p className="absolute text-[30px] text-purple mt-8">
                      REGISTER
                    </p>
                  </div>
                </button>
                <br></br>
                <br></br>
                <div className="flex items-center text-center justify-center">
                  <div className="font-main text-[15px] font-main">
                    Already have an accout?
                  </div>
                  <Link
                    to={"/login"}
                    className="text-[17px] font-main text-[#92509C] font-bold ml-1"
                  >
                    {" "}
                    Click here!
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};
