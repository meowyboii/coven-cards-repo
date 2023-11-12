import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AdminMenu } from "./AdminMenu";
import { Card, Text, Metric, Flex, ProgressBar, SparkAreaChart, BadgeDelta, DonutChart, Legend } from "@tremor/react";
import { Layout } from "../../components/LayoutAdmin";
import axios from "axios";
import toast from "react-hot-toast";
// import { MdEdit } from "react-icons/md";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [dailySaleTotal, setDailySaleTotal] = useState([]);
  const [yearlyAmount, setYearlySale] = useState(0);
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cats, setProdCount] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setTotalUsers] = useState(0);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);

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

  // const DailyTotal = () => {
  //   let dailyAmount = 0;
    
  //   for(let i = 0; i < orders.length; i++){
  //     if(new Date(orders[i].createdAt)===currentDate.getTime()){
  //       dailyAmount += orders[i].total;
  //     }
  //     console.log(currentDate);
  //     console.log(endOfDay);
  //     console.log(orders[i].createdAt);
  //   }
  //   setDailySale(dailyAmount);
  // };


  const getDailySaleTotal = () => {
    let totalAmount = 0;
    const dailySale = orders.filter((order) => {
      // Assuming product.createdAt is the property indicating the creation date
      const createdAt = new Date(order.createdAt);

      // Calculate the difference in milliseconds
      const timeDifference = currentDate - createdAt;

      // Calculate the difference in days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      // Return true if the product was created within the day
      return daysDifference < 1;
    });
    for (let i = 0; i < dailySale.length; i++) {
      totalAmount += dailySale[i].total;
    }
    setDailySaleTotal(totalAmount);
  };
  useEffect(() => {
    getDailySaleTotal();
  }, [orders]);

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
    // DailyTotal();
    YearlyTotal();
    SalesTotal();
  }, [orders]);

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
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
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

  useEffect(() => {
    setSaleProducts(products.filter((product) => product.sale === true));
    setNewArrivals(
      products.filter((product) => {
        // Assuming product.createdAt is the property indicating the creation date
        const createdAt = new Date(product.createdAt);

        // Calculate the difference in milliseconds
        const timeDifference = currentDate - createdAt;

        // Calculate the difference in days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        // Return true if the product was created within the last 7 days
        return daysDifference < 7;
      })
    );
  }, [products]);

  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const ProductCount = () => {
    let cats = [];
    for(let i = 0; i < categories.length; i++){
      cats = [...cats, {name: categories[i].name, ctr: 0}];
    }
    for(let i = 0; i < products.length; i++){
      const index = cats.findIndex(item => item['name'] === products[i].category.name);
      cats[index]['ctr'] = cats[index].ctr+1;
    }
    setProdCount(cats);
  };

  useEffect(() => {
    ProductCount();
  }, [products, categories]);

  const colors = ["slate", "violet", "indigo", "rose", "cyan", "amber"].slice(0, categories.length);

  const textFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()} products`
  const priceFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`

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
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Metric className="text-5xl">$  {dailySaleTotal}</Metric>
          </Flex>
          </Card>

          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
            <Text>Yearly Sales</Text>
            <Metric className="text-xl">$  {yearlyAmount}</Metric>
            <Flex className="mt-4">
            <Text>{(yearlyAmount * 100)/100000}% of annual target</Text>
            <Text>$ 100,000</Text>
            </Flex>
            <ProgressBar value={(yearlyAmount * 100)/100000} className="mt-2 bg-red" />
          </Card>

          <Card className="max-w-sm flex-col items-center h-[20vh] w-[35vh] bg-white p-10 rounded">
            <Text>Overall Sales</Text>
            <Flex justifyContent="center" alignItems="center">
            <Metric className="text-5xl">$  {totalSale}</Metric>
            </Flex>
          </Card>
        </div>
        <div className="flex justify-center mt-4"> 
        {/* 53vh */}
        <div className="ml-[83.5vh]">
        <DataTable
            title="New Arrivals"
            columns={columns}
            data={newArrivals}
            scrollable scrollHeight="20vh"
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
            data={saleProducts}
            scrollable scrollHeight="20vh"
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
            <div className="mt-5">
            <Text>Products per Category</Text>
            <Legend
              className="mt-5 text-xs"
              categories={["T-shirts", "Collectibles"]}
              colors={colors}
            />
            </div>
            <DonutChart
            className="w-[15vh]"
            data={cats}
            category="ctr"
            index="name"
            valueFormatter={textFormatter}
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
            </Flex>
          </Card>

          <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
          <Text>User Count</Text>
          <Flex justifyContent="center" alignItems="center">
          <Metric className = "text-6xl">{userCount}</Metric>
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
            valueFormatter={priceFormatter}
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