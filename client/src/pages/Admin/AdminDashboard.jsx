import React from "react";
import bannerImg from "../../assets/img/home_playnow.png";
import { AdminMenu } from "./AdminMenu";
import { Layout } from "../../components/Layout";

export const AdminDashboard = () => {
  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <section style={container} className="relative h-[100vh] p-10">
    <Layout>
      <div className="flex item-center justify-center py-[25vh]">
        <AdminMenu />
      </div>
    </Layout>
    </section>
  );
};
