import React from "react";
import { useState } from "react";
import SlidingSidePanel from "react-sliding-side-panel";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useCart();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="cursor-pointer display flex justify-center"
        onClick={togglePanel}
      >
        <AiOutlineShoppingCart className=" text-[45px]" />
        <span class="relative flex h-[20px] w-[20px]">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-100"></span>
          <span class="relative inline-flex rounded-full h-[20px] w-[20px] bg-violet-500"></span>
          <Badge color="violet" count={cart?.length} showZero /> 
        </span>
      </div>

      <SlidingSidePanel
        type="right"
        isOpen={isOpen}
        size={30} // Adjust the size as needed
        animationDuration={400} // Adjust the animation duration as needed
        backdropClicked={togglePanel}
      >
        {/* Content for your sliding panel */}
        <div className="bg-white p-8">
          <div className="flex justify-end mr-4">
            <button onClick={togglePanel}>X</button>
          </div>

          <h2>Your Cart</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sit,
            earum molestias aperiam possimus non neque laborum eius, ut
            doloremque iste unde atque tempora voluptatum nostrum porro
            voluptatibus doloribus deserunt! A ducimus, itaque nam esse
            reprehenderit, cumque sit laboriosam odio magni illo beatae,
            recusandae quam corrupti pariatur. Officiis, ex laboriosam?
          </p>
          <Link to="/merch/checkout">Checkout</Link>
        </div>
      </SlidingSidePanel>
    </div>
  );
};
