import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import bannerImg from "../../assets/img/login_bg.png";

export const OrderHistory = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    filter: "saturate(80%)",
  };

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);

  const tableCustomStyles = {
    header: {
      style: {
        fontSize: "40px",
        height: "10vh",
        color: "#e7a5f2",
        backgroundColor: "#1e1e1f",
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    headRow: {
      style: {
        color: "#e7a5f2",
        backgroundColor: "#303030",
        fontSize: "25px",
        height: "7vh",
      },
    },
    rows: {
      style: {
        color: "#e7a5f2",
        backgroundColor: "#1e1e1f",
        fontSize: "18px",
        height: "7vh",
      },
      stripedStyle: {
        color: "#e7a5f2",
        backgroundColor: "#232324",
      },
      highlightOnHoverStyle: {
        color: "#dfa9e8",
        backgroundColor: "#333333",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineColor: "#593c5e",
        borderBottomColor: "#593c5e",
      },
    },
    pagination: {
      style: {
        color: "#e7a5f2",
        backgroundColor: "#1e1e1f",
        fontSize: "20px",
        height: "10vh",
      },
      pageButtonStyle: {
        backgroundColor: "'transparent'",
        fill: "#e7a5f2",
        "&:disabled": {
          cursor: "unset",
          color: "#303030",
          fill: "#303030",
        },
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
          <h3 className="mb-4">Delivery Status: {row.delivery_status}</h3>
          <h2>Products: </h2>
          {row.products.map((item) => (
            <>
              <tr
                key={item?._id}
                className="transition ease-in-out delay-100 hover:bg-[#ebdfeb]"
              >
                <td className="flex justify-left items-center py-2">
                  <div className="flex justify-center items-center shadow-md h-[8vh] w-[8vh] mr-6">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item.product?._id}`}
                      alt={item.product.name}
                      className="max-h-full object-cover"
                    />
                  </div>

                  {item.product.name}
                </td>
                <td className="px-4 py-2">
                  ${item.product.amountSale?.toFixed(2)}
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
              </tr>
            </>
          ))}
          <h3 className="mt-4">Total Amount Paid: ${row.total.toFixed(2)}</h3>
        </div>
      ),
      onCancel: () => setVisible(false),
      styles: { 
        width: "80%",
        backgroundColor: "#1e1e1f",
        
      },
      okButtonProps: {
        style: {
          backgroundColor: "#ff0000", // Change button background color
          color: "#ffffff", // Change button text color
        },
      },
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
        console.log(data?.orders);
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
      selector: (row) => `$${row.total?.toFixed(2)}`,
    },
    {
      name: "Delivery Status",
      selector: (row) => row.delivery_status,
    },
  ];

  return (
    <LayoutMerch>
      <div className="min-h-screen" style={container}>
        <div className="flex justify-center h-[100vh] min-w-[50vh] p-2 mb-15 border-2 border-[#78146235] bg-gradient-to-b from-[#1E0523cd] to-[#00000050]">
          <div className="w-[125vh] m-5 p-5">
            <DataTable
              title="Order History"
              columns={columns}
              data={orders}
              pagination
              highlightOnHover
              striped
              customStyles={tableCustomStyles}
            />
          </div>
        </div>
      </div>
      <Snowfall color="#e977d3c2" snowflakeCount={20} />
    </LayoutMerch>
  );
};
