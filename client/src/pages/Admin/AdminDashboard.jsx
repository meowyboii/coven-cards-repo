import React from "react";
import { AdminMenu } from "./AdminMenu";
import { Layout } from "../../components/Layout";

export const AdminDashboard = () => {
  return (
    <Layout>
      <div className="flex item-center justify-center py-[25vh]">
        <AdminMenu />
      </div>
    </Layout>
  );
};
