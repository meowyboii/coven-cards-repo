import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const { Option } = Select;

// const [modifiedProducts, setModifiedProducts] = React.useState(new Set());
const modifiedProducts = new Set();

const CategorySelect = ({ product, categories, handleCategoryChange }) => {
  const [category, setCategory] = useState(product.category.name);

  const onCategoryChange = (newCategory) => {
    setCategory(newCategory);
    handleCategoryChange(product, newCategory);
    modifiedProducts.add(product._id);
  };
  return (
    <Select
      style={{ width: "100%" }}
      value={category}
      onChange={(value) => onCategoryChange(value)}
    >
      {categories.map((c) => (
        <Option key={c._id} value={c.name}>
          {c.name}
        </Option>
      ))}
    </Select>
  );
};

const StockCell = ({ product, handleStockChange }) => {
  const [stock, setStock] = useState(product.stock);

  const onStockChange = (newStock) => {
    setStock(newStock);
    handleStockChange(product, newStock);
    modifiedProducts.add(product._id);
  };

  return (
    <input
      type="number"
      value={stock}
      onChange={(e) => onStockChange(e.target.value)}
    />
  );
};

const PriceCell = ({ product, handlePriceChange }) => {
  const [price, setPrice] = useState(product.price);

  const onPriceChange = (newPrice) => {
    setPrice(newPrice);
    handlePriceChange(product, newPrice);
    modifiedProducts.add(product._id);
  };

  return (
    <input
      type="number"
      value={price}
      onChange={(e) => onPriceChange(e.target.value)}
    />
  );
};

export const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const columns = [
    {
      name: "Product",
      selector: (row) => row.name,
    },
    {
      name: "Category",
      cell: (row) => (
        <CategorySelect
          product={row}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
        />
      ),
    },
    {
      name: "Stock",
      cell: (row) => (
        <StockCell product={row} handleStockChange={handleStockChange} />
      ),
    },
    {
      name: "Price",
      cell: (row) => (
        <PriceCell product={row} handlePriceChange={handlePriceChange} />
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
  const updateProduct = async (productId, data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/update-product/${productId}`,
        data
      );

      if (response.status === 200) {
        console.log("Product updated successfully");
      } else {
        console.error("Product update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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

  const handleCategoryChange = (product, newCategory) => {
    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, category: newCategory } : item
    );
    setProducts(updatedProducts);
  };

  const handleSubmit = () => {
    for (let i = 0; i < modifiedProducts.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (products[j]._id === modifiedProducts.getByIndex(i)) {
          updateProduct(products[j]._id, products[j]);
        }
      }
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(modifiedProducts);
  }, [products]);

  return (
    <div className="flex item-center justify-center py-[20vh] text-white mx-20 ">
      <AdminMenu />

      <div className="h-[40vh] w-4/5 ml-10 ">
        <DataTable
          title="Product List"
          columns={columns}
          data={products}
          pagination
          highlightOnHover
        />
        <button
          className=" mt-5 p-5 bg-white text-black"
          // onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};
