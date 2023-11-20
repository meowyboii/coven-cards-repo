import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LayoutMerch } from "../../components/LayoutMerch";
import buttonImg from "../../assets/img/button clean.png";
import { useCart } from "../../context/cart";
import { InputNumber, ConfigProvider, theme } from "antd";

export const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
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

  useEffect(() => {
    // Make an API request to fetch the list of photos in the specified folder
    axios.get(`http://localhost:3001/photos?folderName=${product.name}`)
      .then(response => {
        setPhotos(response.data);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, [product]);

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
            {photos.map((image, index) => (
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
                  {/* <img
                    src={products.images[index]}
                    alt={`${products.name}-mini`}
                    className="h-full w-full object-cover transition-transform transform scale-100 hover:scale-110 transition-transform duration-500"
                  /> */}
                  <img key={index} src={`http://localhost:3001/uploads/${product.name}/${image}`} alt={`Photo ${index}`} className="h-full w-full object-cover transition-transform transform scale-100 hover:scale-110 transition-transform duration-500" />
                </div>
              </button>
            ))}
          </div>

          {/* Product Images */}
          <div className="flex justify-center items-center h-[70vh] w-2/4 mx-[15vh] p-10 mt-16 mb-20 border-2 border-[#78146235] bg-gradient-to-b from-[#1E0523] to-[#00000050] rounded-lg">
            <img
              src={photos[activeImageIndex]}
              alt={product.name}
              className="max-w-full object-cover"
            />
          </div>

          {/* Product Description */}
          <div className="mt-14 mb-20 max-w-1/3 max-h-[100vh] bg-[#1E0523] p-16 pb-10 ">
            <h1 className="text3 text-3xl font-bold font-maintoo mb-6">
              {product.name}
            </h1>

            <>
              {product.sale ? (
                <h2 className="text-2xl font-maintoo font-bold mb-4">{`$${product.amountSale}`}</h2>
              ) : (
                <h2 className="text-2xl font-main mb-4">{`$${product.price}.00`}</h2>
              )}
            </>
            <h3 className="text-m font-thin  mb-10">{`Available Stock: ${product.stock}`}</h3>
            <div className="w-[40vh] h-auto">
              <p className="text-lg font-main mb-6">{product.description}</p>
            </div>

            <h3 className="text-m font-main font-thin mb-3">Quantity: </h3>
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
            <div className="mt-10 glow w-[30vh] mb-6">
              <button className="left-[80vh] top-[70vh]" type="submit">
                <div className="flex justify-center items-center ">
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
          </div>

          {/* Add more product details here */}
        </div>
      </div>
    </LayoutMerch>
  );
};
