import React from "react";
import { Products } from "./Admin/Products";
import { LayoutMerch } from "../components/LayoutMerch";

export const Merch = () => {
  return (
    <LayoutMerch>
      <div className="py-40"></div>
      <div className="mx-20">
        <Products />
      </div>
    </LayoutMerch>
  );
};
