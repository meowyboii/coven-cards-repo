import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LayoutMerch } from "../../components/LayoutMerch";
import buttonImg from "../../assets/img/button clean.png";
import { useCart } from "../../context/cart";
import { InputNumber, ConfigProvider, theme } from "antd";

// Import Images
// import img1 from "../../assets/img/sc1.png";
import img2 from "../../assets/img/sc2.png";
import img3 from "../../assets/img/sc3.png";
import cap1 from "../../assets/img/CC-Cap1.png";
import cap2 from "../../assets/img/CC-Cap2.png";
import hoodie2 from "../../assets/img/CC-Hoodie2.png";
import hoodie3 from "../../assets/img/CC-Hoodie3.png";
import mug1 from "../../assets/img/CC-Mug1.png";
import mug2 from "../../assets/img/CC-Mug3.png";
import shirt1 from "../../assets/img/CC-Shirt1.png";
import shirt2 from "../../assets/img/CC-Shirt2.png";
import dtgshirt1 from "../../assets/img/DTG-Shirt1.png";
import dtgshirt2 from "../../assets/img/DTG-Shirt2.png";
import poster1 from "../../assets/img/poster1.png";
import poster2 from "../../assets/img/poster2.png";
export const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  let alternativeImage1, alternativeImage2;

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

  const setAlternativeImages = () => {
    switch (product.name) {
      case "Coven Cards Poster #1":
        alternativeImage1 = poster1;
        alternativeImage2 = poster2;
        break;
      case "Dorothea the Great T-Shirt":
        alternativeImage1 = dtgshirt1;
        alternativeImage2 = dtgshirt2;
        break;
      case "Coven Cards Mug":
        alternativeImage1 = mug1;
        alternativeImage2 = mug2;
        break;
      case "Coven Cards Cap":
        alternativeImage1 = cap1;
        alternativeImage2 = cap2;
        break;
      case "Coven Cards Hoodie":
        alternativeImage1 = hoodie2;
        alternativeImage2 = hoodie3;
        break;
      default:
        alternativeImage1 = img2;
        alternativeImage2 = img3;
    }
  };
  setAlternativeImages();
  // Replace this with your product data or fetch it from an API
  const products = {
    name: "Sample Product",
    images: [
      `${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`,
      alternativeImage1,
      alternativeImage2,
      // Add more image URLs here
    ],
    description: "Product description goes here.",
    // Add other product details as needed
  };

  const handleTabClick = (index) => {
    setActiveImageIndex(index);
  };
  const handleSubmit = (e) => {
    if (quantity >= 1 && quantity <= product.stock) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === product._id) {
          const updatedCart = [...cart];
          updatedCart[i].quantity += quantity;
          setCart(updatedCart);
          localStorage.setItem("cart", JSON.stringify([...cart]));
          toast.success("Item Added to Cart");
          return;
        }
      }
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
    } else {
      toast.error("Please input the right quantity");
    }
  };
  return (
    <LayoutMerch>
      <div className="w-full bg-gradient-to-b from-[#0e0014] to-[#08000b] h-full">
        <div className="flex justify-end text-white h-full">
          {/* Image Tabs */}
          <div className="flex justify-center items-center pl-16 flex-col w-1/4 ">
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
          <div className="flex justify-center items-center h-[70vh] w-2/4 mx-[15vh] p-10 mt-16 mb-20 border-2 border-[#78146235] bg-gradient-to-b from-[#1E0523] to-[#00000050] rounded-lg">
            <img
              src={products.images[activeImageIndex]}
              alt={products.name}
              className="max-w-full object-cover"
            />
          </div>

          {/* Product Description */}
          <div className="mt-14 mb-20 max-w-1/3 max-h-[100vh] bg-[#1E0523] p-16 pb-10 ">
            <h1 className="text2 text-3xl font-bold font-maintoo mb-6">
              {product.name}
            </h1>
            <h2 className="text-2xl mb-4">{`$${product.price}.00`}</h2>
            <h3 className="text-m font-thin  mb-10">{`Available Stock: ${product.stock}`}</h3>
            <div className="w-[40vh] h-auto">
              <p className="text-lg mb-6">{product.description}</p>
            </div>

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
