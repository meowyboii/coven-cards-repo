import React from "react";
import { useState } from "react";
import SlidingSidePanel from "react-sliding-side-panel";
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import emptycart from "../../assets/img/empty-cart.png";

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
        <AiOutlineShoppingCart className="text-[45px]" />
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
        <div className="bg-[#f1e9f1] p-8 min-h-[30vh]">
          <div className="flex justify-end mr-4 cursor-pointer  ">
            <AiFillCloseCircle
              onClick={togglePanel}
              className="text-3xl transition ease-in-out delay-100 text-purple hover:text-purpler"
            >
              X
            </AiFillCloseCircle>
          </div>

          {cart?.length > 0 ? (
            <>
              <table className="table-auto border-collapse text-lg font-main">
                <div>Added Products:</div>
                <tbody className="text-purplerest">
                  {cart?.map((product, index) => (
                    <>
                      <tr key={product.id} className="transition ease-in-out delay-100 hover:bg-[#ebdfeb]">
                        <td className="flex justify-left items-center py-2">
                          <div className="flex justify-center items-center shadow-md h-[8vh] w-[8vh] mr-6">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              className="max-h-full object-cover"
                            />
                          </div>

                          {product.name}
                        </td>
                        <td className="px-4 py-2">${product.amountSale}</td>

                        <td className="px-4 py-2">
                          <button
                            className="px-4 py-2 text-white rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler my-2 mx-2 text-sm"
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
              <button className="px-4 py-2 text-white font-main text-lg rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler mt-6 place-self-end">
                <Link to="/merch/checkout" className="place-self-end">
                  View Cart
                </Link>
              </button>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-center font-main font bold mb-6 mt-4">Your cart is empty!</h2>
              <img src={emptycart} className="h-[10vh] w-auto saturate-50" />
            </div>
          )}
        </div>
      </SlidingSidePanel>
    </div>
  );
};
