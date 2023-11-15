import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

export const Dashboard = () => {
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
        formDataToSend.append("photo:", photo);
      });

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
        </div>
      ),
      onCancel: () => setVisible(false),
    });
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
      selector: (row) => row.createdAt,
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
      <div className="bg-[#1E0523DF] p-10 rounded-3xl text-purple mt-[15vh]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-bold font-maintoo mb-4 mt-16 mb-10">
            {auth.user.firstName}'s Profile
          </h1>
          <br></br>
          <div className="flex justify-center mx-[50vh]">
            <div className="mx-10 w-[50vh]">
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
                className="px-4 py-2 bg-purple text-white text-lg rounded hover:bg-purpler mt-6 place-self-end"
              >
                Save
              </button>
            </div>
            <div className="justify-center items-center ml-40 ">
              <div className="bg-white rounded-full h-40 w-40">
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="user"
                    className="h-full w-full object-cover rounded-full"
                  />
                )}
              </div>
              <div className="my-10 ">
                <label className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 cursor-pointer ">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div>
                <h3>File size: maximum 1 MB</h3>
                <h3>File extension: .JPEG, .PNG</h3>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-[192.5vh] ml-10 mr-10 h-[100vh] py-[10vh] ">
        <DataTable
          title="Your Orders"
          columns={columns}
          data={orders}
          pagination
          highlightOnHover
          striped
          customStyles={tableCustomStyles}
          onRowClicked={(row, event) => {}}
        />
      </div>
    </LayoutMerch>
  );
};
