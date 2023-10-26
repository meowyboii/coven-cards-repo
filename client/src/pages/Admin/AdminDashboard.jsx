import React from "react";
import bannerImg from "../../assets/img/home_playnow.png";
import { AdminMenu } from "./AdminMenu";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../context/auth";

export const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  const container = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <>
      <section style={container} className="relative h-[100vh] p-10">
        <div className="flex item-center justify-center py-[10vh]">
          <AdminMenu />
        </div>
      </section>
      <Footer />
    </>
  );
};
