import React, { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";
import { Layout } from "../../components/LayoutAdmin";
import axios from "axios";
import toast from "react-hot-toast";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSale, setTotalSale] = useState(0);

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

  return (
    <Layout>
    <div className="flex item-center justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />
        <div className="container mx-auto ml-20 mt-2 min-h-[100vh] py-[10vh]">
        <Card className="max-w-sm bg-white rounded p-10">
        <Text>Sales</Text>
        <Metric>$  {addCommas(totalSale)}</Metric>
        <Flex className="mt-4">
        <Text>32% of annual target</Text>
        <Text>$ 225,000</Text>
        </Flex>
        <ProgressBar value={32} className="mt-2 bg-red" />
        </Card>
        </div>
    </div>
    </Layout>
  );
}