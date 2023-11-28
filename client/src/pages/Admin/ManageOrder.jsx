import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { Layout } from "../../components/LayoutAdmin";
import { MdCancelPresentation } from "react-icons/md";
import { Modal } from "antd";

export const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currRow, setCurrRow] = useState({});
  const [reason, setReason] = useState();

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

  const getAllOrder = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/get-order`
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

  const sendMessage = async (text) => {
    const message = {
      phone: currRow.shipping.phone,
      text: text,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/message/send-message`,
        message
      );
      console.log("SMS sent successfully:", response.data);
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (orderId, currentStatus) => {
    let newStatus;
    if (currentStatus === "Not Processed") {
      newStatus = "Processing";
    } else if (currentStatus === "Processing") {
      newStatus = "Shipped";
    } else if (currentStatus === "Shipped") {
      newStatus = "Delivered";
    } else {
      newStatus = currentStatus;
      setIsModalOpen(false);
      sendMessage(
        `Your order has been cancelled for the following reason: ${reason}`
      );
    }
    console.log(orderId, currentStatus, newStatus);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/order/update-order/${orderId}`,
        { delivery_status: newStatus }
      );
      if (data?.success) {
        console.log(data);
        toast.success("Successfully updated delivery status");
        getAllOrder();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in updating delivery status");
    }
  };

  const getDate = (updatedAt) => {
    const dateObject = new Date(updatedAt);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  };

  const handleCancelOrder = (row) => {
    setCurrRow(row);
    setIsModalOpen(true);
  };

  const columns = [
    {
      name: "Buyer",
      selector: (row) => `${row.buyer.firstName} ${row.buyer.lastName}`,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => `$${row.total.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status,
    },
    {
      name: "Delivery Status",
      cell: (row) => (
        <div className="flex justify-center">
          <div className="mx-1">
            {row.delivery_status === "Delivered" ? (
              <div className="bg-emerald-300 p-2 rounded-[4px]">
                {row.delivery_status}
              </div>
            ) : row.delivery_status === "Cancelled" ? (
              <div className="bg-red-300 p-2 rounded-[4px]">
                {row.delivery_status}
              </div>
            ) : (
              <button
                className="bg-slate-300 p-2 rounded-[4px]"
                onClick={() => handleUpdate(row._id, row.delivery_status)}
              >
                {row.delivery_status}
              </button>
            )}
          </div>
          <div className="mx-1">
            {row.delivery_status !== "Cancelled" &&
            row.delivery_status !== "Delivered" ? (
              <>
                <button
                  className="bg-slate-300 p-2 rounded-[4px]"
                  onClick={() => handleCancelOrder(row)}
                >
                  Cancel
                </button>
                <>
                  <>
                    <Modal
                      title="Confirm Order Cancellation"
                      open={isModalOpen}
                      footer={null}
                      onCancel={() => setIsModalOpen(false)}
                      maskStyle={{ backgroundColor: "#00000040" }}
                    >
                      <p>State your reason for cancelling this order:</p>
                      <div className="mb-4 ">
                        <textarea
                          rows="4"
                          cols="50"
                          id="categoryName"
                          className=" bg-white px-4 py-2 border rounded-md text-[#343434] font-main w-[35vh] h-[10vh] mb-3 resize-none"
                          placeholder="Enter your reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <button
                          className="px-4 py-2 text-white rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler my-2 mx-2 text-sm"
                          onClick={() => handleUpdate(currRow._id, "Cancelled")}
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
              </>
            ) : null}
          </div>
        </div>
      ),
    },
    {
      name: "Date Modified",
      selector: (row) => getDate(row.updatedAt),
      sortable: true,
    },
  ];

  return (
    <Layout>
      <div className="flex justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />

        <div className="w-[192.5vh] ml-10 mr-10 h-[100vh] py-[10vh]">
          <DataTable
            title="Manage Orders"
            columns={columns}
            data={orders}
            pagination
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
          />
        </div>
      </div>
    </Layout>
  );
};
