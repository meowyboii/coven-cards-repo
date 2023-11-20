import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { Layout } from "../../components/LayoutAdmin";
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
  const [productImages, setProductImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("");

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
    handleUpload();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("stock", stock);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      console.log(productData);
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

  const handleFileChange = (e) => {
    setFiles([]);
    const selectedFiles = e.target.files;
    const newFiles = Array.from(selectedFiles).slice(0, 3);
    setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
  };

  const handleUpload = () => {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append("files", file);
    });

    formData.append("folderName", name || "defaultFolder");

    axios
      .post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });

    // Clear the files and folderName state after upload
    setFiles([]);
    setFolderName("");
  };

  return (
    <Layout>
      <div className="flex justify-center font-main text-[#343434] bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />
        <div className="container mx-auto ml-20 mt-2 min-h-[100vh] py-[10vh]">
          <h2 className="text-3xl mb-4 ">Create Product</h2>
          <div className="mt-3 text-[#343434]">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="rounded bg-white text-black border-white w-[35vh]"
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
            {/* <div className="mt-10 ">
              <label className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 cursor-pointer ">
                Upload Alternative Photo/s
                <input
                  type="file"
                  multiple
                  name="photos"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFiles = e.target.files;
                    const newPhotos = [];
                    for (let i = 0; i < selectedFiles.length; i++) {
                      newPhotos.push(selectedFiles[i]);
                    }
                    setProductImages(newPhotos);
                  }}
                  required
                  hidden
                />
              </label>
            </div> */}
            <div className="mt-10 flex">
              {productImages.length > 0 &&
                productImages.map((image, index) => (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product"
                      className="h-[200px]"
                    />
                  </div>
                ))}
            </div>
            <div className="mb-4 mt-10">
              <label htmlFor="name" className="block text-m font-bold">
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
                className="mt-1 p-2 w-[50vh] border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-m font-bold">
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
                className="mt-1 p-2 w-[50vh] border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Description"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-m font-bold">
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
                className="mt-1 p-2 w-[50vh] border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Price"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-m font-bold">
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
                className="mt-1 p-2 w-[50vh] border border-gray-300 rounded focus:ring focus:ring-indigo-300 focus:outline-none text-black"
                placeholder="Product Stock"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-m font-bold mb-1">
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
            <div>
              <h1>File Upload</h1>
              <label className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 cursor-pointer ">
                {files.length >0? `${files.length} uploaded` : "Upload Photos"}
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  require
                  hidden
                />
              </label>
              <div className="mt-10 flex">
                {files.map((photo) => (
                  <div className="text-center mx-2">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product"
                      className="h-[200px]"
                    />
                  </div>
                ))}
              </div>
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
