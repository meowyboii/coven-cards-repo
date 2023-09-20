import React from "react";
import { Products } from "./Admin/Products";
import { LayoutMerch } from "../components/LayoutMerch";

export const Merch = () => {
  return (
    <LayoutMerch className="">
      <div className="py-20 bg-[#241d2f]"></div>

      <div className="px-20 bg-[#241d2f]">
        <Products />
      </div>
    </LayoutMerch>
  );
};
