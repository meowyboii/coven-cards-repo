import React, { useState, useEffect } from "react";
import { LayoutMerch } from "../../components/LayoutMerch";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const SingleCategory = () => {
  const [category, setCategory] = useState([]);
  const params = useParams();

  const getCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/single-category/${[
          params.slug,
        ]}`
      );
      if (data.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the category");
    }
  };

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

  useEffect(() => {
    if (params?.slug) {
      getCategory();
    }
  }, [params?.slug]);

  const filteredProducts = products.filter((product) => {
    return product.category.name === category.name;
  });

  return (
    <LayoutMerch>
      <div className="min-h-[80vh] pt-20 justify content-center items-center ">
        <h2 className="text-4xl font-bold mb-14 text-[#f1e9f1] text-center uppercase">
          {category.name}
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
                    <p className="text-lg text-red-200 mr-2">{`$${product.amountSale?.toFixed(
                      2
                    )}`}</p>
                    <p className="ml-2 text-lg opacity-80 line-through">{`$${product.price.toFixed(
                      2
                    )}`}</p>
                  </div>
                ) : (
                  <p className="text-lg mt-2">{`$${product.price.toFixed(
                    2
                  )}`}</p>
                )}
              </>
            </Link>
          ))}
        </div>
      </div>
    </LayoutMerch>
  );
};
