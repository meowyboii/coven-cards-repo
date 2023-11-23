import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import axios from "axios";

export const PayButton = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [total, setTotal] = useState(0);
  const handleCheckout = async () => {
    try {
      const stripeCart = cart.map(
        ({
          sale,
          slug,
          category,
          shipping,
          createdAt,
          updatedAt,
          __v,
          ...rest
        }) => rest
      );
      console.log(stripeCart);
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/stripe/create-checkout-session`,
        { stripeCart, userId: auth?.user.id }
      );
      if (response.data.url) {
        console.log(response.data.url);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].amountSale * cart[i].quantity;
    }
    return total;
  };

  useEffect(() => {
    setTotal(calculateTotal);
  }, [cart]);
  return (
    <div>
      <h2 className="text-2xl">Total: ${total.toFixed(2)}</h2>
      <button
        className="px-4 py-2 text-white text-2xl rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler mt-6 place-self-end"
        onClick={() => handleCheckout()}
      >
        Checkout
      </button>
    </div>
  );
};
