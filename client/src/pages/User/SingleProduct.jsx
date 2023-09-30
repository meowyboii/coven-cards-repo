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
import { InputNumber, ConfigProvider, theme } from "antd";

export const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [quantity, setQuantity] = useState(1);

  const inputNumberStyle = {
    backgroundColor: "#2E1832",
    padding: "5px",
    fontzFamily: "",
  };

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
  const handleSubmit = (e) => {
    console.log(quantity);
    if (product.quantity >= 1 && product.quantity !== "") {
      toast.error("Please input the right quantity");
    } else {
      const productWithQuantity = {
        ...product,
        quantity: quantity,
      };
      setCart([...cart, productWithQuantity]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, productWithQuantity])
      );
      toast.success("Item Added to Cart");
    }
  };
  return (
    <LayoutMerch>
      <div className="w-full bg-gradient-to-b from-[#0e0014] to-[#08000b] h-full">
        <div className="flex justify-end ml-20 text-white h-full">
          {/* Image Tabs */}
          <div className="flex justify-center items-center flex-col">
            {products.images.map((image, index) => (
              <button
                key={index}
                className={`${
                  activeImageIndex === index
                    ? "border-2 border-purpler "
                    : " text-gray-600"
                } px-3 py-3 my-2  bg-gradient-to-b from-[#00000050] to-[#1E0523] rounded-lg w-[13vh] h-[13vh] `}
                onClick={() => handleTabClick(index)}
              >
                <div className="m-0 p-0">
                  <img
                    src={products.images[index]}
                    alt={`${products.name}-mini`}
                    className="h-full w-full object-cover transition-transform transform scale-100 hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Product Images */}
          <div className="flex justify-center items-center mb-4 h-[70vh] w-1/2 mx-5 mt-16 mb-20 border-2 border-[#78146235] bg-gradient-to-b from-[#1E0523] to-[#00000050] rounded-lg">
            <img
              src={products.images[activeImageIndex]}
              alt={products.name}
              className="max-w-full object-cover"
            />
          </div>

          {/* Product Description */}
          <div className="mt-16 mb-20 max-w-1/3 max-h-[81vh] bg-[#1E0523] p-16 ">
            <h1 className="text2 text-3xl font-bold font-maintoo mb-6">
              {product.name}
            </h1>
            <h2 className="text-2xl mb-4">{`$${product.price}.00`}</h2>
            <h3 className="text-m font-thin  mb-10">{`Available Stock: ${product.stock}`}</h3>

            <p className="text-lg mb-6">{product.description}</p>
            <h3 className="text-m font-thin  mb-3">Quantity: </h3>
            <div className="mb-4">
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  components: {
                    InputNumber: {
                      activeBorderColor: "#2E1832",
                      addonBg: "white",
                      handleBg: "#2E1832",
                      handleBorderColor: "#781462",
                      handleHoverColor: "white",
                      hoverBorderColor: "#781462",
                    },
                  },
                }}
              >
                <InputNumber
                  value={quantity}
                  min={1}
                  max={product.stock}
                  defaultValue={1}
                  onChange={setQuantity}
                  style={inputNumberStyle}
                />
              </ConfigProvider>
            </div>

            {/* <div className="flex justify-center items-center p-4 bg-[#2E1832] w-1/4 mb-4 rounded-2xl">
              <button
                className="mr-4"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                -
              </button>
              {quantity}
              <button
                className="ml-4"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity === product.stock}
              >
                +
              </button>
            </div> */}
            <button className="left-[80vh] top-[70vh]" type="submit">
              <div className="flex justify-center items-center w-[30vh]">
                <img src={buttonImg} alt="play-now button" />

                <h2
                  className="font-bold absolute text-[25px] text-purple mt-5"
                  onClick={() => handleSubmit()}
                >
                  ADD TO CART
                </h2>
              </div>
            </button>
          </div>

          {/* Add more product details here */}
        </div>
      </div>
    </LayoutMerch>
  );
};
