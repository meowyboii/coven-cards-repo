import React, { useState, useEffect } from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const currentDate = new Date();

  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (data.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Assuming product.createdAt is the property indicating the creation date
    const createdAt = new Date(product.createdAt);

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - createdAt;

    // Calculate the difference in days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Return true if the product was created within the last  days
    return daysDifference < 7;
  });

  return (
    <LayoutMerch>
      <div className="min-h-[80vh] pt-20 justify content-center items-center ">
        <h2 className="text-4xl font-bold mb-14 text-[#f1e9f1] text-center uppercase">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-4 gap-8 text-white px-40 ">
          {filteredProducts.map((product) => (
            <Link key={product._id} to={`/merch/product/${product.slug}`}>
              <div className="bg-gradient-to-br from-[#340449] to-[#0E0014] p-4 rounded shadow-md h-[45vh] mb-4 flex justify-center items-center">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full max-h-full object-cover transition-transform transform scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <>
                {product.sale ? (
                  <div className="flex content-center mt-2">
                    <p className="text-lg text-red-200 mr-2">{`$${product.amountSale}`}</p>
                    <p className="ml-2 text-lg opacity-80 line-through">{`$${product.price}.00`}</p>
                  </div>
                ) : (
                  <p className="text-lg mt-2">{`$${product.price}.00`}</p>
                )}
              </>
            </Link>
          ))}
        </div>
      </div>
    </LayoutMerch>
  );
};
