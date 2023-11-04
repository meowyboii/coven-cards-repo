import React from "react";
import { AdminMenu } from "./AdminMenu";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../context/auth";

export const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <section className="relative h-[100vh] p-10 bg-[#E9DDEE]">
        <div className="flex item-center justify-center py-[10vh]">
          <AdminMenu />
        </div>
      </section>
      <Footer />
    </>
  );
};
