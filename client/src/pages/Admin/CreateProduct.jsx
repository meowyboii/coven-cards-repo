import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { Layout } from "../../components/Layout";
const { Option } = Select;

export const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("stock", stock);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        window.location.reload();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex item-center justify-center py-[20vh] text-white mx-20">
        <AdminMenu />
        <div className="container ml-20 mt-4">
          <h2 className="text-4xl font-bold mb-4 ">Create Product</h2>
          <div className="mt-10 text-white bg">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="bg-white text-black border-white w-1/3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-10 ">
              <label className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 cursor-pointer ">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  required
                  hidden
                />
              </label>
            </div>
            <div className="mt-10">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product"
                    className="h-[200px]"
                  />
                </div>
              )}
            </div>
            <div className="mb-4 mt-10">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Description"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium ">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Price"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Stock"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-1"
              >
                Shipping
              </label>
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                onChange={(value) => {
                  setShipping(value);
                }}
                className="bg-white text-black border-white w-1/3"
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
