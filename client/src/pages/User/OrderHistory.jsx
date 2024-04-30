import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import DataTable, { Alignment } from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import bannerImg from "../../assets/img/login_bg.png";
import { motion } from 'framer-motion';

export const OrderHistory = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    filter: "saturate(80%)",
  };

  const capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currRow, setCurrRow] = useState({});

  const tableCustomStyles = {
    header: {
      style: {
        fontSize: "35px",
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
        fontSize: "23px",
        height: "7vh",
      },
    },
    rows: {
      style: {
        color: "#e7a5f2",
        backgroundColor: "#1e1e1f",
        fontSize: "17px",
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

  const handleCancelOrder = (row) => {
    setCurrRow(row);
    setIsModalOpen(true);
  };
  const handleUpdate = async () => {
    console.log(currRow);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/order/update-order/${currRow._id}`,
        { delivery_status: "Cancelled" }
      );
      if (data?.success) {
        toast.success("Successfully cancelled order");
        getAllOrder();
        setIsModalOpen(false);
        setCurrRow({});
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in cancelling order");
    }
  };
  const displayDetails = (row) => {
    const modalContentStyle = {
      backgroundColor: "#e9e0f0",
      padding: "20px",
      borderRadius: "8px",
    };

    const contentStyle = {
      textAlign: "justify",
    };

    Modal.info({

      className: "modalForOrderId",
      title: (
        <div>
          <span className="font-main text-purpler text-xl">Order Details</span>
        </div>
      ),
      maskClosable: true,

      content: (
        <div
          style={Object.assign({}, contentStyle, modalContentStyle)}
          className="font-main text-purplerest"
        >
          <h3 style={{ fontWeight: "bold", fontSize: "1rem" }}>
            <span className="text-purpler">Buyer</span>: {row.shipping.name}
          </h3>
          <h3
            style={{
              fontWeight: "bold",
              marginTop: "1.5rem",
              fontSize: "1rem",
            }}
          >
            <span className="text-purpler">Shipping Address</span>:
          </h3>
          {row.shipping.address.line1}, {row.shipping.address.city},{" "}
          {row.shipping.address.country}
          <h3
            style={{ fontWeight: "bold", marginTop: "1rem", fontSize: "1rem" }}
          >
            <span className="text-purpler">Payment Status</span>:
          </h3>
          {capitalizeFirstLetter(row.payment_status)}
          <h3
            style={{ fontWeight: "bold", marginTop: "1rem", fontSize: "1rem" }}
          >
            <span className="text-purpler">Delivery Status</span>:
          </h3>
          {row.delivery_status}
          <h2
            style={{ marginTop: "1rem", fontSize: "1rem", fontWeight: "bold" }}
          >
            <span className="text-purpler">Products</span>:
          </h2>
          <table>
            <thead className="text-purple">
              <tr className="bg-[#340449cd]">
                <th className=" rounded-tl-md py-2 text-center">Product</th>
                <th className="px-2 py-2 ">Unit Price</th>
                <th className="rounded-tr-md px-4  py-2 min-w-[10vh]">
                  Quantity
                </th>
              </tr>
            </thead>
            {row.products.map((item) => (
              <tbody>
                <tr
                  key={item?.id}
                  className="transition ease-in-out delay-100 hover:bg-[#e7d4e7]"
                >
                  <td className="flex justify-left items-center py-2 text-center">
                    <div className="flex justify-center items-center shadow-md h-[8vh] w-[8vh] mr-6">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item.product?._id}`}
                        alt={item.product.name}
                        className="max-h-full object-cover"
                      />
                    </div>

                    {item.product.name}
                  </td>
                  <td className="px-4 py-2 px-16 text-center">
                    ${item.product.amountSale?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                </tr>
              </tbody>
            ))}
          </table>
          <h3
            style={{ marginTop: "2rem", fontSize: "1rem", fontWeight: "bold" }}
            className="flex justify-center"
          >
            <span className="text-purpler">Total Amount Paid</span>: $
            {row.total.toFixed(2)}
          </h3>
        </div>
      ),
      onCancel: () => setVisible(false),
      onOk() {},
      width: "50vh",
      okButtonProps: {
        style: {
          backgroundColor: "#A484A9",
          color: "#ffffff",
          margin: '10px',
          minWidth: '6vh',
          minHeight: '5vh',
          fontSize: '23px',
          fontFamily: 'Fredoka, serif',
        },
        onMouseEnter: (e) => {
          e.target.style.backgroundColor = "#7B0E90"; // Change color on hover
        },
        onMouseLeave: (e) => {
          e.target.style.backgroundColor = "#A484A9"; // Revert to original color on leave
        },
      },
      bodyStyle: {
        maxHeight: '70vh', // Adjust the value based on your needs
        overflowY: 'auto',
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
        `${process.env.REACT_APP_API}/api/v1/order/get-user-order/${auth.user?.id}`
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
    {
      name: "Action",
      cell: (row) => (
        <>
          {row.delivery_status !== "Cancelled" &&
          row.delivery_status !== "Shipped" &&
          row.delivery_status !== "Delivered" ? (
            <>
              <button
                className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler"
                onClick={() => handleCancelOrder(row)}
              >
                Cancel Order
              </button>
              <>
                <Modal
                  title="Confirm Order Cancellation"
                  open={isModalOpen}
                  footer={null}
                  onCancel={() => setIsModalOpen(false)}
                  maskStyle={{ backgroundColor: "#00000040" }}
                  className="custom-modal"
                >
                  <p>Are you sure you want to cancel your order?</p>
                  <div>
                    <button
                      className="px-4 py-2 text-white rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler my-2 mx-2 text-sm"
                      onClick={() => handleUpdate()}
                    >
                      Confirm
                    </button>
                    <button
                      className="px-4 py-2 text-white rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler my-2 mx-2 text-sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </>
            </>
          ) : (
            <div
              className="px-4 py-2 bg-purple text-white rounded opacity-60"
              onClick={() =>
                toast.error("You cannot cancel this order anymore")
              }
            >
              Cancel Order
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <LayoutMerch>
      <div style={container}>
        <div className=" flex justify-center h-[110vh] min-w-[50vh] p-2 mb-15 border-2 border-[#78146235] bg-gradient-to-b from-[#1E0523cd] to-[#00000050]">
          <div className="w-[145vh] m-5 p-5 font-main">
            <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 1 }}
            >
            <DataTable
              title="Order History"
              columns={columns}
              data={orders}
              pagination
              highlightOnHover
              striped
              customStyles={tableCustomStyles}
              paginationPerPage={10}
            />
            </motion.div>
          </div>
        </div>
      </div>
      <Snowfall color="#e977d3c2" snowflakeCount={20} />
    </LayoutMerch>
  );
};
