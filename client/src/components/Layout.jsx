import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-[80vh]"> {children}</main>
      <Footer />
    </div>
  );
};
