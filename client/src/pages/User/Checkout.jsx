import React, { useState } from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

export const Checkout = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

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
    <LayoutMerch>
      <div className="py-20 items-center flex-col flex justify-center text-white text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">{`Hello ${
          auth?.token && auth?.user?.firstName
        }!`}</h2>
        <h3 className="text-2xl font-base text-white mb-4">
          {cart?.length
            ? `You have ${cart.length} item(s) in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart is empty!"}
        </h3>
        {cart?.length > 0 && (
          <table className="table-auto border-collapse w-3/4">
            <thead>
              <tr>
                <th className="border px-4 py-2 ">Product</th>
                <th className="border px-4 py-2 ">Unit Price</th>
                <th className="border px-4 py-2 min-w-[18vh]">Quantity</th>
                <th className="border px-4 py-2 ">Total Price</th>
                <th className="border px-4 py-2 ">Actions</th>
              </tr>
            </thead>
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
                      <div className="flex justify-center items-center p-4 mb-4 ">
                        <button
                          className="border p-1"
                          onClick={() => {
                            const updatedCart = [...cart];
                            updatedCart[index].quantity--;
                            setCart(updatedCart);
                          }}
                        >
                          -
                        </button>
                        <span className="px-4 border py-1">
                          {product.quantity}
                        </span>
                        <button
                          className="border  p-1"
                          onClick={() => {
                            const updatedCart = [...cart];
                            updatedCart[index].quantity++;
                            setCart(updatedCart);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border-b border-gray-400 px-4 py-2">
                      ${product.quantity * product.price}
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
        )}
      </div>
    </LayoutMerch>
  );
};
