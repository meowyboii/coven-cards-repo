import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1 className="text-4xl font-bold mt-[10vh] p-4 text-white text-center">
        PRODUCTS
      </h1>
      <div className="grid grid-cols-4 gap-8 text-white px-40 pb-40 pt-10">
        {products.map((product) => (
          <Link key={product._id} to={`/merch/product/${product.slug}`}>
            <div className="bg-gradient-to-br from-[#340449] to-[#0E0014] p-4 rounded shadow-md h-[39vh] mb-4 flex justify-center items-center">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="w-full max-h-full object-cover transition-transform transform scale-100 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg mt-2">{`$${product.price}.00`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};