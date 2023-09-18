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
    <div className="grid grid-cols-4 gap-8 text-white px-40">
      {products.map((product) => (
        <Link key={product._id} to={`/merch/product/${product.slug}`}>
          <div className="bg-purple p-4 rounded shadow-md h-[45vh] mb-4">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-lg mt-2">{`$${product.price}.00`}</p>
        </Link>
      ))}
    </div>
  );
};
