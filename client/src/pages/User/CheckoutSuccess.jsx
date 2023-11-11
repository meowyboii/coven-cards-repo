import React from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useEffect } from "react";
import { useCart } from "../../context/cart";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Snowfall from 'react-snowfall'

export const CheckoutSuccess = () => {
  const [cart, setCart] = useCart();

  useEffect(() => {
    localStorage.removeItem("cart");
    setCart([]);
  }, []);
  return (
    <LayoutMerch>
      <div className="flex flex-col justify-center items-center w-auto h-[85vh] bg-gradient-to-b from-purplerest to-purpler text-[#360640]">
        <AiOutlineCheckCircle className="text-[10vh] " />
        <h1 className="text-4xl font-main font-bold p-4 text-center">
          Checkout Success!
        </h1>
        <h2 className="text-3xl font-main p-4 text-center">
          Thank you for your purchase!
        </h2>
        <Link
          to={"/merch"}
          className="px-4 py-2 font-main bg-[#360640] text-2xl text-white rounded hover:bg-[#24032a] my-2 mx-2"
        >
          Continue Shopping
        </Link>
      </div>

          <Snowfall
            color="#f14ad0"
            snowflakeCount={80}
          />
    </LayoutMerch>
  );
};
