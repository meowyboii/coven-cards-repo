import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useEffect } from "react";
import { useCart } from "../../context/cart";

export const CheckoutSuccess = () => {
  const [cart, setCart] = useCart();

  useEffect(() => {
    localStorage.removeItem("cart");
    setCart([]);
  }, []);
  return (
    <LayoutMerch>
      <h1>Checkout Success!</h1>
    </LayoutMerch>
  );
};
