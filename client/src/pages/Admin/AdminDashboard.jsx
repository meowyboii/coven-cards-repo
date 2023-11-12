import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AdminMenu } from "./AdminMenu";
import { Card, Text, Metric, Flex, ProgressBar, SparkAreaChart, BadgeDelta } from "@tremor/react";
import { Layout } from "../../components/LayoutAdmin";
import axios from "axios";
import toast from "react-hot-toast";
// import { MdEdit } from "react-icons/md";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const columns = [
    {
      name: "Product",
      selector: (row) => row.name,
    },
  ]

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

  const SalesTotal = () => {
    let totalAmount = 0;
    for(let i = 0; i < orders.length; i++){
      totalAmount += orders[i].total;
    }
    setTotalSale(totalAmount);
  };

  useEffect(() => {
    SalesTotal();
    console.log(totalSale);
    console.log(orders);
  }, [orders]);

  function addCommas(number){
    let numString = number.toString();
    numString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const chartdata = [ //for overall, needs data
    {
      month: "Jan 21",
      Performance: 4000,
      "Benchmark": 3000,
    },
    {
      month: "Feb 21",
      Performance: 3000,
      "Benchmark": 2000,
    },
    {
      month: "Mar 21",
      Performance: 2000,
      "Benchmark": 1700,
    },
    {
      month: "Apr 21",
      Performance: 2780,
      "Benchmark": 2500,
    },
    {
      month: "May 21",
      Performance: 1890,
      "Benchmark": 1890,
    },
    {
      month: "Jun 21",
      Performance: 2390,
      "Benchmark": 2000,
    },
    {
      month: "Jul 21",
      Performance: 3490,
      "Benchmark": 3000,
    },
  ];

  const getAllUsers = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-users`
      );
      if (data.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the users");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  
  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (data.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#343434",
        backgroundColor: "#e7eef0",
        border: "rounded",
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

  return (
    <Layout>
    <div className="flex item-center justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB] min-h-screen">
        <AdminMenu />
        <div className="grid grid-cols-3 gap-5 mr-[19vh] ml-[9vh]">
        <div className="col-span-3 p-2 grid grid-cols-1 md:grid-cols-3 gap-32 mx-auto ml-5 mt-2 py-[10vh]">
          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
          <Flex justifyContent="between" alignItems="center">
            <Text>Daily Sales</Text>
            <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="md" className="rounded-full">
              +12.3%
            </BadgeDelta>
          </Flex>
            <Metric>$  {totalSale}</Metric>
            <Flex className="mt-4">
            <Text>{(totalSale * 100)/100000}% of annual target</Text>
            <Text>$ 100,000</Text>
            </Flex>
            <ProgressBar value={(totalSale * 100)/100000} className="mt-2 bg-red" />
          </Card>

          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
            <Text>Yearly Sales</Text>
            <Metric>$  {totalSale}</Metric>
            <Flex className="mt-4">
            <Text>{(totalSale * 100)/100000}% of annual target</Text>
            <Text>$ 100,000</Text>
            </Flex>
            <ProgressBar value={(totalSale * 100)/100000} className="mt-2 bg-red" />
          </Card>

          <Card className="max-w-sm flex-col items-center h-[20vh] w-[35vh] bg-white rounded">
            <div className="z-10 absolute p-3">
            <Text>Overall Sales</Text>
            <Metric className="text-5xl mt-[2vh]">$  {totalSale}</Metric>
            </div>
            <div className="child z-1">
            <SparkAreaChart
              data={chartdata}
              categories={["Performance"]}
              index={"month"}
              colors={["pink"]}
              className="h-[10vh] w-full flex-1 mt-[6vh]"
            />
            </div>
          </Card>
        </div>
        <div className="w-[50vh] ml-7">
        <DataTable
            title="New Arrivals"
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
        />
        <br></br>
        <DataTable
            title="Products on Sale"
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
        />
        </div>
        </div>
    </div>
    </Layout>
  );
}