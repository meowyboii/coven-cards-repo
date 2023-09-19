import React from "react";
import { Footer } from "./Footer";
import { MerchNavbar } from "./MerchNavbar";
export const LayoutMerch = ({ children }) => {
  return (
    <div>
      <MerchNavbar />
      <main className="min-h-[80vh]"> {children}</main>
      <Footer />
    </div>
  );
};
