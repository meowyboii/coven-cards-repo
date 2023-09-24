import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import img1 from "../../assets/img/sc1.png";
import img2 from "../../assets/img/sc2.png";
import img3 from "../../assets/img/sc3.png";
import { LayoutMerch } from "../../components/LayoutMerch";
import buttonImg from "../../assets/img/button clean.png";
import { useCart } from "../../context/cart";

export const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();

  const getSingleProduct = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setProduct(data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the product");
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Replace this with your product data or fetch it from an API
  const products = {
    name: "Sample Product",
    images: [
      `${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`,
      img2,
      img3,
      // Add more image URLs here
    ],
    description: "Product description goes here.",
    // Add other product details as needed
  };

  const handleTabClick = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <LayoutMerch>
      <div className="w-full mt-40 bg-[#241d2f] ">
        <div className="flex justify-center items-center ml-20 text-white">
          {/* Image Tabs */}
          <div className="flex justify-center items-center flex-col  w-1/5 ">
            {products.images.map((image, index) => (
              <button
                key={index}
                className={`${
                  activeImageIndex === index
                    ? "border-2 border-purpler "
                    : " text-gray-600"
                } px-3 py-3 my-2  bg-purple w-[13vh] h-[13vh] `}
                onClick={() => handleTabClick(index)}
              >
                <div className="m-0 p-0">
                  <img
                    src={products.images[index]}
                    alt={`${products.name}-mini`}
                    className="h-full w-full object-cover transition-transform transform scale-100 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Product Images */}
          <div className="flex justify-center items-center mb-4  h-[70vh] w-[100vh] mx-20">
            <img
              src={products.images[activeImageIndex]}
              alt={products.name}
              className="max-h-[65vh] object-cover"
            />
          </div>

          {/* Product Description */}
          <div className="mt-4 w-1/3 max-h-[81vh] bg-[#0D080E] p-16 ">
            <h1 className="text-3xl font-semibold mb-6">{product.name}</h1>
            <h2 className="text-2xl mb-4">{`$${product.price}.00`}</h2>
            <h3 className="text-m font-thin  mb-10">{`Available Stock: ${product.quantity}`}</h3>

            <p className="text-lg mb-6">{product.description}</p>

            <button className="left-[80vh] top-[70vh]" type="submit">
              <div className="flex justify-center items-center w-[30vh]">
                <img src={buttonImg} alt="play-now button" />
                <p
                  className="font-bold absolute text-[25px] text-purple mt-7"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to Cart");
                  }}
                >
                  ADD TO CART
                </p>
              </div>
            </button>
          </div>

          {/* Add more product details here */}
        </div>
      </div>
    </LayoutMerch>
  );
};
