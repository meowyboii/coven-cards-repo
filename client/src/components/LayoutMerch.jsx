import React from "react";
import { Footer } from "./Footer";
import { MerchNavbar } from "./MerchNavbar";
export const LayoutMerch = ({ children }) => {
  return (
    <div>
      <MerchNavbar />
      <div className="mt-[14vh]"></div>
      <main className="min-h-[50vh]"> {children}</main>
      <Footer />
    </div>
  );
};
