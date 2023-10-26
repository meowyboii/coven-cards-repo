import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const { Option } = Select;

export const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const CategorySelect = ({
    value,
    productId,
    categories,
    handleCategoryChange,
  }) => (
    <Select
      style={{ width: "100%" }}
      value={value}
      onChange={(newValue) => handleCategoryChange(productId, newValue)}
    >
      {categories.map((category) => (
        <Option key={category._id} value={category.name}>
          {category.name}
        </Option>
      ))}
    </Select>
  );

  const columns = [
    {
      name: "Product",
      selector: (row) => row.name,
    },
    {
      name: "Category",
      cell: (row) => (
        <CategorySelect
          value={row.category.name}
          productId={row.category._id}
          categories={categories}
          // onChange={handleCategoryChange}
        />
      ),
    },
    {
      name: "Stock",
      cell: (row) => (
        <input
          type="number"
          value={row.stock}
          onChange={(e) => handleStockChange(row, e.target.value)}
        />
      ),
    },
    {
      name: "Price",
      cell: (row) => (
        <input
          type="number"
          value={row.price}
          onChange={(e) => handlePriceChange(row, e.target.value)}
        />
      ),
    },
    {
      name: "Remove",
      selector: () => (
        <button>
          <AiFillDelete className="text-2xl ml-2 text-[#bd2b2b] " />
        </button>
      ),
    },
  ];

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
    getAllProducts();
    getAllCategory();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleStockChange = (product, newStock) => {
    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, stock: newStock } : item
    );
    setProducts(updatedProducts);
  };

  const handlePriceChange = (product, newPrice) => {
    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, price: newPrice } : item
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="flex item-center justify-center py-[20vh] text-white mx-20 ">
      <AdminMenu />

      <div className="h-[40vh] w-4/5 ml-10">
        <DataTable
          title="Product List"
          columns={columns}
          data={products}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};
