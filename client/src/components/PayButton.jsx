import React from "react";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import axios from "axios";

export const PayButton = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/stripe/create-checkout-session`,
        { cart, userId: auth?.id }
      );
      if (response.data.url) {
        console.log(response.data.url);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={() => handleCheckout()}>Checkout</button>
    </div>
  );
};
