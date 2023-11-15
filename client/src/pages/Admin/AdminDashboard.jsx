import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AdminMenu } from "./AdminMenu";
import { Card, Text, Metric, Flex, ProgressBar, SparkAreaChart, BadgeDelta, DonutChart } from "@tremor/react";
import { Layout } from "../../components/LayoutAdmin";
import axios from "axios";
import toast from "react-hot-toast";
// import { MdEdit } from "react-icons/md";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [dailyAmount, setDailySale] = useState(0);
  const [yearlyAmount, setYearlySale] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setTotalUsers] = useState(0);
  const currentDate = new Date();

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

  currentDate.setHours(0, 0, 0, 0);

  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);

  const DailyTotal = () => {
    let dailyAmount = 0;
    for(let i = 0; i < orders.length; i++){
      if (!(orders[i].createdAt >= currentDate && orders[i].createdAt <= endOfDay)){
        break;
      }
      dailyAmount += orders[i].total;
    }
    setDailySale(dailyAmount);
  };

  const currentYear = new Date().getFullYear();

  const YearlyTotal = () => {
    let yearlyAmount = 0;
    for(let i = 0; i < orders.length; i++){
      if (!(order => order.createdAt.getFullYear() === currentYear)){
        break;
      }
      yearlyAmount += orders[i].total;
    }
    setYearlySale(yearlyAmount);
  };

  const SalesTotal = () => {
    let totalAmount = 0;
    for(let i = 0; i < orders.length; i++){
      totalAmount += orders[i].total;
    }
    setTotalSale(totalAmount);
  };

  useEffect(() => {
    DailyTotal();
    YearlyTotal();
    SalesTotal();
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
        `${process.env.REACT_APP_API}/api/v1/auth/get-users`
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

  const UsersTotal = () => {
    let userCount = users.length;
    setTotalUsers(userCount);
  };

  useEffect(() => {
    UsersTotal();
  }, [users]);
  
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

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
  ];
  
  const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#343434",
        backgroundColor: "#eee1f4",
        border: "rounded",
      },
    },
    rows: {
      style: {
        color: "#343434",
        backgroundColor: "#ffffff",
        width: "54.3vh",
      },
      stripedStyle: {
        color: "#343434",
        backgroundColor: "#ffffff",
      },
    },
  };

  return (
    <Layout>
    <div className="flex justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB] min-h-screen">
        <AdminMenu />
        <div className="container mt-2 ml-20 py-[5vh]">
          <div>
            <h2 className="text-3xl mb-4 ">Dashboard</h2>
        <div className="grid grid-cols-3 gap-2 mr-[19vh] ml-[9vh]">
        <div className="col-span-3 p-2 grid grid-cols-1 md:grid-cols-3 gap-32 ml-5">
          
          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
          <Flex justifyContent="between" alignItems="center">
            <Text>Daily Sales</Text>
            <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="md" className="rounded-full">
              +12.3%
            </BadgeDelta>
          </Flex>
            <Metric className="text-2xl">$  {dailyAmount}</Metric>
          </Card>

          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
            <Text>Yearly Sales</Text>
            <Metric>$  {yearlyAmount}</Metric>
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
              colors={["blue"]}
              className="h-[10vh] w-full flex-1 mt-[6vh]"
            />
            </div>
          </Card>
        </div>
        <div className="flex justify-center mt-4"> 
        {/* 53vh */}
        <div className="ml-[83.5vh]">
        <DataTable
            title="New Arrivals"
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
        />
        </div>

        <div className="ml-10">
        <DataTable
            title="Products on Sale"
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
        />
        </div>
        </div>
        <div className="col-span-3 p-2 grid grid-cols-1 md:grid-cols-3 gap-32 ml-5 mt-4">
          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-5">
          <Flex justifyContent="between" alignItems="center">
            <Text>Products per Category</Text>
            <DonutChart
            className="w-[20vh]"
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
            </Flex>
          </Card>

          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
          <Text>User Count</Text>
          <Flex justifyContent="between" alignItems="center">
          <Metric className = "text-6xl">{userCount}</Metric>
            <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="md" className="rounded-full mb-[4vh]">
              +12.3%
            </BadgeDelta>
          </Flex>
          </Card>

          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-5">
          <Flex justifyContent="between" alignItems="center">
            <Text>Best Selling Products</Text>
            <DonutChart
            className="w-[20vh]"
            data={cities}
            category="sales"
            index="name"
            variant="pie"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
            </Flex>
          </Card>
        </div>
        </div>
        </div>
        </div>
    </div>
    </Layout>
  );
}