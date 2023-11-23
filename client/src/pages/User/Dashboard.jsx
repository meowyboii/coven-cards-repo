import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import profile from "../../assets/img/mystery_man.png";
import bannerImg from "../../assets/img/login_bg.png";

export const Dashboard = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    filter: "saturate(80%)",
  };

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState("");

  const changeDateFormat = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    firstName: auth.user.firstName,
    lastName: auth.user.lastName,
    address: auth.user.address,
    dateOfBirth: changeDateFormat(auth.user.dateOfBirth),
  });

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
      const formDataToSend = new FormData();

      // Append form data fields to the FormData object
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("photo:", photo);

      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-user/${auth.user.id}`,
        formDataToSend
      );

      if (res.data.success) {
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#343434",
        backgroundColor: "#e7eef0",
      },
    },
    rows: {
      style: {
        color: "#343434",
        backgroundColor: "#ffffff",
      },
      stripedStyle: {
        color: "#343434",
        backgroundColor: "#ffffff",
      },
    },
  };

  const displayDetails = (row) => {
    Modal.info({
      title: "Order Details",
      content: (
        <div className="text-justify">
          <h3>Name: {row.shipping.name}</h3>
          <h3>
            Shipping Address: {row.shipping.address.line1},{" "}
            {row.shipping.address.city}, {row.shipping.address.country}
          </h3>
          <h3>Payment Status: {row.payment_status}</h3>
          <h3>Delivery Status: {row.delivery_status}</h3>
          <h3>Date Modified: {getDate(row.updatedAt)}</h3>
        </div>
      ),
      onCancel: () => setVisible(false),
    });
  };

  const getDate = (updatedAt) => {
    const dateObject = new Date(updatedAt);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  };

  const getAllOrder = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/get-user-order/${auth.user.id}`
      );
      if (data.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the orders");
    }
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  const columns = [
    {
      name: "Order Id",
      selector: (row) => (
        <button
          onClick={() => {
            displayDetails(row);
          }}
        >
          {row._id}
        </button>
      ),
    },
    {
      name: "Order Date",
      selector: (row) => getDate(row.createdAt),
    },
    {
      name: "Total Amount",
      selector: (row) => `$${row.total}`,
    },
    {
      name: "Delivery Status",
      selector: (row) => row.delivery_status,
    },
  ];
  return (
    <LayoutMerch>
      <div className="min-h-screen pt-[1px]" style={container}>
        <div className="bg-[#360640cd] p-10 text-purple mt-[8vh] shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <div className="p-10 text-center flex flex-col justify-center items-center">
                <h1 className="text-3xl text3">
                  {auth.user.firstName}'s Profile
                </h1>
                <div className="bg-white rounded-full h-40 w-40">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="user"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : auth.user.photo ? (
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/auth/user-photo/${auth.user.id}`}
                      className="h-full w-full object-cover rounded-full"
                      alt="user"
                    />
                  ) : (
                    <img
                      src={profile}
                      className="h-full w-full object-cover rounded-full z-2"
                      alt="no profile"
                    />
                  )}
                </div>
                <div className="my-10 mt-10">
                  <label className="px-4 py-2 text-white rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler my-2 cursor-pointer ">
                    Upload Photo
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="font-main text-regular">
                  <h3>File size: maximum 1 MB</h3>
                  <h3>File extension: .JPEG, .PNG</h3>
                </div>
              </div>

              <div className="flex ml-[10vh] mt-10 mb-10">
                <div className="w-[40vh] ml-[10vh]">
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
                      // max={current}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="font-main w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 text-white text-lg rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler mt-6 place-self-end"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Snowfall color="#e977d3c2" snowflakeCount={20} />
    </LayoutMerch>
  );
};
