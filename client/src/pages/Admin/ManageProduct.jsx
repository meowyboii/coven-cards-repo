import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { Layout } from "../../components/LayoutAdmin";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const { Option } = Select;

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
    newStock = parseInt(newStock);
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
    newPrice = parseInt(newPrice);
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
    const modifiedObject = {
      price: data.price,
      category: data.category,
      stock: data.stock,
    };
    try {
      console.log(modifiedObject);
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${productId}`,
        modifiedObject
      );

      if (response.status === 200) {
        toast.success(`Product ${data.name} updated successfully`);
        console.log(`Product ${data.name} updated successfully`);
      } else {
        toast.error("Product update failed");
        console.error("Product update failed");
      }
    } catch (error) {
      toast.error(`Error in updating product: ${data.name}`);
      console.error("Error updating product:", error);
    }
  };

  const handleStockChange = (product, newStock) => {
    const updatedProducts = products.map((item) =>
      item._id === product._id ? { ...item, stock: newStock } : item
    );
    setProducts(updatedProducts);
  };

  const handlePriceChange = (product, newPrice) => {
    const updatedProducts = products.map((item) =>
      item._id === product._id ? { ...item, price: newPrice } : item
    );
    setProducts(updatedProducts);
  };

  const handleCategoryChange = (product, newCategory) => {
    const updatedProducts = products.map((item) =>
      item._id === product._id ? { ...item, category: newCategory } : item
    );
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    const modifiedProductIds = Array.from(modifiedProducts);

    for (const productId of modifiedProductIds) {
      const product = products.find((p) => p._id === productId);

      if (product) {
        try {
          await updateProduct(productId, product);
          console.log(`Product ${product.name} updated successfully`);
        } catch (error) {
          console.error(`Error updating product: ${product.name}`, error);
          toast.error(`Error in updating product: ${product.name}`);
        }
      }
    }
    modifiedProducts = new Set();
    getAllProducts();
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(modifiedProducts.size);
  }, [products]);

  return (
    <Layout>
      <div className="flex item-center justify-center text-white bg-gradient-to-b from-black to-[#0e0014]">
        <AdminMenu />

        <div className="w-[199vh] ml-10 h-[100vh] py-[10vh]">
          <DataTable
            title="Product List"
            columns={columns}
            data={products}
            pagination
            highlightOnHover
          />
          {modifiedProducts.size > 0 ? (
            <button
              className=" mt-5 p-5 bg-white text-black hover:bg-slate-100"
              onClick={handleSubmit}
            >
              Save
            </button>
          ) : (
            <button
              className=" mt-5 p-5 bg-white text-slate-400"
              onClick={() => toast.error("No changes applied to save")}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
