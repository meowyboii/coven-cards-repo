import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
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

  useEffect(() => {
    setSaleProducts(products.filter((product) => product.sale === true));
    setNewArrivals(
      products.filter((product) => {
        // Assuming product.createdAt is the property indicating the creation date
        const createdAt = new Date(product.createdAt);

        // Calculate the difference in milliseconds
        const timeDifference = currentDate - createdAt;

        // Calculate the difference in days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        // Return true if the product was created within the last 7 days
        return daysDifference < 7;
      })
    );
  }, [products]);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold mt-[10vh] p-4 text-[#f1e9f1] text-center">
          SALE PRODUCTS
        </h1>
        <div className="grid grid-cols-4 gap-8 text-[#f1e9f1] px-40 pb-40 pt-10">
          {saleProducts.map((product) => (
            <Link key={product._id} to={`/merch/product/${product.slug}`}>
              <div className="bg-gradient-to-br from-[#340449] to-[#0E0014] p-4 rounded shadow-md h-[39vh] mb-4 flex justify-center items-center">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full max-h-full object-cover transition-transform transform scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>

              <div className="flex content-center mt-2">
                <p className="text-lg text-red-200 mr-2">{`$${product.amountSale.toFixed(
                  2
                )}`}</p>
                <p className="ml-2 text-lg opacity-80 line-through">{`$${product.price.toFixed(
                  2
                )}`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold p-4 text-[#f1e9f1] text-center">
          NEW ARRIVALS
        </h1>
        <div className="grid grid-cols-4 gap-8 text-[#f1e9f1] px-40 pb-40 pt-10">
          {newArrivals.map((product) => (
            <Link key={product._id} to={`/merch/product/${product.slug}`}>
              <div className="bg-gradient-to-br from-[#340449] to-[#0E0014] p-4 rounded shadow-md h-[39vh] mb-4 flex justify-center items-center">
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
                    <p className="text-lg text-red-200 mr-2">{`$${product.amountSale.toFixed(
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
      <div>
        <h1 className="text-4xl font-bold p-4 text-[#f1e9f1] text-center">
          ALL PRODUCTS
        </h1>
        <div className="grid grid-cols-4 gap-8 text-[#f1e9f1] px-40 pb-40 pt-10">
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
              <>
                {product.sale ? (
                  <div className="flex content-center mt-2">
                    <p className="text-lg text-red-200 mr-2">{`$${product.amountSale.toFixed(
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
    </div>
  );
};
