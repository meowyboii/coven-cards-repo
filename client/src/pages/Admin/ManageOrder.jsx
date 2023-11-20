import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { Layout } from "../../components/LayoutAdmin";
import { MdCancelPresentation } from "react-icons/md";
export const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

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
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the orders");
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

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

  const columns = [
    {
      name: "Buyer",
      selector: (row) => `${row.buyer.firstName} ${row.buyer.lastName}`,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.total,
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
              <button
                className="bg-slate-300 p-2 rounded-[4px]"
                onClick={() => handleUpdate(row._id, "Cancelled")}
              >
                Cancel
              </button>
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
