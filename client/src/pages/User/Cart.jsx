import React from "react";
import { useState } from "react";
import SlidingSidePanel from "react-sliding-side-panel";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useCart();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const removeFromCart = (pid) => {
    try {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((product) => product._id !== pid);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in removing product");
    }
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
        <div className="bg-white p-8 min-h-[40vh]">
          <div className="flex justify-end mr-4">
            <button onClick={togglePanel}>X</button>
          </div>

          {cart?.length > 0 ? (
            <>
              <table className="table-auto border-collapse w-3/4">
                <tbody>
                  {cart?.map((product, index) => (
                    <>
                      <tr key={product.id}>
                        <td className="flex justify-center items-center border-b border-gray-400 py-2">
                          <div className="shadow-md h-[20vh] mr-6">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              className="max-h-full object-cover"
                            />
                          </div>

                          {product.name}
                        </td>
                        <td className="border-b border-gray-400 px-4 py-2">
                          ${product.price}
                        </td>

                        <td className="border-b border-gray-400 px-4 py-2">
                          <button
                            className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 mx-2"
                            onClick={() => removeFromCart(product._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <Link to="/merch/checkout">Checkout</Link>
            </>
          ) : (
            <h2 className="text-center">Your cart is empty!</h2>
          )}
        </div>
      </SlidingSidePanel>
    </div>
  );
};
