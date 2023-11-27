// import React, { useEffect, useState } from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import Snowfall from "react-snowfall";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { PayButton } from "../../components/PayButton";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // const [clientToken, setClientToken] = useState("");
  // const [instance, setInstance] = useState("");
  // const [loading, setLoading] = useState(false);

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

  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
  //     );
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  // const handlePayment = () => {};

  return (
    <LayoutMerch>
      <div className="py-20 items-center flex-col flex justify-center text-white text-center bg-gradient-to-b from-black to-[#0e0014]">
        <h2 className="text-3xl font-semibold text3 mb-4">{`Hello ${
          auth?.token && auth?.user?.firstName
        }!`}</h2>
        <h3 className="text-2xl text-purple font-base font-main mb-10">
          {cart?.length
            ? `You have ${cart.length} item(s) in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart is empty!"}
        </h3>
        {cart?.length > 0 && (
          <>
            <table className="table-auto font-main text-purple bg-gradient-to-b from-[#0E0014cd] to-[#340449cd] rounded-lg w-3/4">
              <thead>
                <tr className="bg-[#340449cd]">
                  <th className="border-r border-[#000000] rounded-tl-md px-4 py-2 ">
                    Product
                  </th>
                  <th className="border-r border-[#000000] px-4 py-2 ">
                    Unit Price
                  </th>
                  <th className="border-r border-[#000000] px-4 py-2 min-w-[18vh]">
                    Quantity
                  </th>
                  <th className="border-r border-[#000000] px-4 py-2 ">
                    Total Price
                  </th>
                  <th className="rounded-tr-md px-4 py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((product, index) => (
                  <>
                    <tr key={product.id}>
                      <td className="flex justify-center items-center border-b border-[#000000] py-2">
                        <div className="shadow-md h-[20vh] mr-6">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            className="max-h-full object-cover"
                          />
                        </div>
                        <div>{product.name}</div>
                      </td>
                      <td className="border-b border-[#000000] px-4 py-2">
                        ${product.amountSale.toFixed(2)}
                      </td>
                      <td className="border-b border-[#000000] px-4 py-2">
                        <div className="flex justify-center items-center p-4 mb-4">
                          <button
                            className="border px-1 border-purple scale-90 hover:scale-100"
                            onClick={() => {
                              const updatedCart = [...cart];
                              updatedCart[index].quantity--;
                              setCart(updatedCart);
                            }}
                            disabled={product.quantity === 1}
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{product.quantity}</span>
                          <button
                            className="border px-1 border-purple scale-90 hover:scale-100"
                            onClick={() => {
                              const updatedCart = [...cart];
                              updatedCart[index].quantity++;
                              setCart(updatedCart);
                            }}
                            disabled={product.quantity === product.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-[#000000] px-4 py-2">
                        ${(product.quantity * product.amountSale).toFixed(2)}
                      </td>
                      <td className="border-b border-[#000000] px-4 py-2">
                        <button
                          className="px-4 py-2 text-white rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler my-2 mx-2"
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

            <div className="mt-10 font-main text-purple">
              {!auth.user ? (
                <>
                  <button className="px-4 py-2 text-white text-2xl rounded transition ease-in-out delay-100 bg-purple hover:bg-purpler mt-6 place-self-end">
                    <Link to={"/login"}>Log in</Link>
                  </button>
                </>
              ) : (
                <>
                  <PayButton />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <Snowfall color="#e977d3c2" snowflakeCount={30} />
    </LayoutMerch>
  );
};
