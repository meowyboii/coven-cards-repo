import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AdminMenu } from "./AdminMenu";
import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  SparkAreaChart,
  Icon,
  DonutChart,
  Legend,
} from "@tremor/react";
import { IoCashOutline } from "react-icons/io5";
import { FiStar } from "react-icons/fi";
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
  const [best, setBestCount] = useState([]);
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
  ];

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
    for (let i = 0; i < orders.length; i++) {
      if (!((order) => order.createdAt.getFullYear() === currentYear)) {
        break;
      }
      yearlyAmount += orders[i].total;
    }
    setYearlySale(yearlyAmount);
  };

  const SalesTotal = () => {
    let totalAmount = 0;
    for (let i = 0; i < orders.length; i++) {
      totalAmount += orders[i].total;
    }
    setTotalSale(totalAmount);
  };

  useEffect(() => {
    // DailyTotal();
    YearlyTotal();
    SalesTotal();
  }, [orders]);

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
        return daysDifference < 14;
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
    if (!categories) {
      return;
    }

    let cats = [];
    for (let i = 0; i < categories.length; i++) {
      cats = [...cats, { name: categories[i].name, ctr: 0 }];
    }
    for (let i = 0; i < products.length; i++) {
      const index = cats.findIndex(
        (item) => item["name"] === products[i].category.name
      );
      cats[index]["ctr"] = cats[index].ctr + 1;
    }
    setProdCount(cats);
  };

  useEffect(() => {
    ProductCount();
  }, [products, categories]);

  const BestSellCount = () => {
    if (!products) {
      return;
    }

    let best = [];
    for (let i = 0; i < products.length; i++) {
      best = [...best, { id: products[i]._id, name: products[i].name, ctr: 0 }];
    }

    for (let i = 0; i < orders.length; i++) {
      let orderProducts = [];
      orderProducts = orders[i].products;
      for (let j = 0; j < orderProducts.length; j++) {
        const productId = orderProducts[j].product;
        const quantity = orderProducts[j].quantity;

        const index = best.findIndex((item) => item["id"] === productId);

        if (index !== -1) {
          best[index].ctr = best[index].ctr + quantity; // Increment by the quantity
        } else {
          console.log(`Product with id ${productId} not found in best array.`);
        }
      }
      // console.log("ORDER PRODUCTS ", i + 1, ": ", orderProducts);
    }
    console.log(best);
    setBestCount(best);
  };

  useEffect(() => {
    BestSellCount();
  }, [orders, products]);

  const colors = ["slate", "violet", "indigo", "rose", "cyan", "amber"].slice(
    0,
    categories.length
  );

  const textFormatter = (number) => {
    const formattedNumber = new Intl.NumberFormat("us")
      .format(number)
      .toString();

    if (number === 1) {
      return `${formattedNumber} product`;
    } else {
      return `${formattedNumber} products`;
    }
  };
  const buyFormatter = (number) =>
    `${new Intl.NumberFormat("us").format(number).toString()} bought`;

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
        color: "#343434cd ",
        backgroundColor: "#ffffff",
        width: "57.5vh",
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
            <div className="grid grid-cols-3 gap-2 mr-[19vh]">
              <div className="col-span-3 p-2 grid grid-cols-1 md:grid-cols-3 gap-32 ml-5">
                <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
                  <Flex justifyContent="between" alignItems="center">
                    <Icon
                      icon={IoCashOutline}
                      color="violet"
                      variant="solid"
                      tooltip="Sum of Daily Sales"
                      size="xl"
                    />
                    <div className="mt-[1vh]">
                      <Text className="text-lg">Daily Sales</Text>
                      <Metric className="bounce text-5xl">
                        $ {dailySaleTotal}
                      </Metric>
                    </div>
                  </Flex>
                </Card>

                <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
                  <Text className="text-lg">Yearly Sales</Text>
                  <Metric className="text-xl">$ {yearlyAmount}</Metric>
                  <Flex>
                    <Text>
                      {(yearlyAmount * 100) / 100000}% of annual target
                    </Text>
                    <Text>₱ 100,000</Text>
                  </Flex>
                  <ProgressBar value={(yearlyAmount * 100) / 100000} />
                </Card>

                <Card className="max-w-sm flex-col items-center h-[20vh] w-[35vh] bg-white p-10 rounded">
                  <Flex justifyContent="between" alignItems="center">
                    <Icon
                      icon={FiStar}
                      color="violet"
                      variant="solid"
                      tooltip="Sum of Overall Sales"
                      size="xl"
                    />
                    <div className="mt-[1vh]">
                      <Text className="text-lg">Overall Sales</Text>
                      <Metric className="bounce text-5xl">$ {totalSale}</Metric>
                    </div>
                  </Flex>
                </Card>
              </div>
              <div className="flex justify-center mt-4">
                <div className="ml-[86.5vh] w-[57.5vh]">
                  <DataTable
                    title="New Arrivals"
                    columns={columns}
                    data={newArrivals}
                    scrollable
                    scrollHeight="20vh"
                    pagination
                    highlightOnHover
                    striped
                    customStyles={tableCustomStyles}
                  />
                </div>

                <div className="ml-10 w-[57.5vh]">
                  <DataTable
                    title="Products on Sale"
                    columns={columns}
                    data={saleProducts}
                    scrollable
                    scrollHeight="20vh"
                    pagination
                    highlightOnHover
                    striped
                    customStyles={tableCustomStyles}
                  />
                </div>
              </div>
              <div className="col-span-3 p-2 grid grid-cols-1 md:grid-cols-3 gap-32 ml-5 mt-4">
                <Card className="card-one max-w-sm h-[20vh] w-[35vh] bg-white rounded p-5">
                  <Flex justifyContent="between" alignItems="center">
                    <div className="mt-5">
                      <Text className="text-lg">Products per Category</Text>
                    </div>
                    <DonutChart
                      className="w-[15vh]"
                      data={cats}
                      category="ctr"
                      index="name"
                      valueFormatter={textFormatter}
                      colors={[
                        "slate",
                        "violet",
                        "indigo",
                        "rose",
                        "cyan",
                        "amber",
                      ]}
                    />
                  </Flex>
                </Card>

                <Card className="max-w-sm h-[20vh] w-[35vh] bg-white rounded p-10">
                  <Text className="text-lg">User Count</Text>
                  <Flex justifyContent="center" alignItems="center">
                    <Metric className="bounce text-6xl">
                      {userCount} users
                    </Metric>
                  </Flex>
                </Card>

                <Card className="card-two max-w-sm h-[20vh] w-[35vh] bg-white rounded p-5">
                  <Flex justifyContent="between" alignItems="center">
                    <div className="mt-5">
                      <Text className="text-lg">Orders per Product</Text>
                    </div>
                    <DonutChart
                      className="w-[20vh]"
                      data={best}
                      category="ctr"
                      index="name"
                      variant="pie"
                      valueFormatter={buyFormatter}
                      colors={[
                        "slate",
                        "violet",
                        "indigo",
                        "rose",
                        "cyan",
                        "amber",
                      ]}
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
};
