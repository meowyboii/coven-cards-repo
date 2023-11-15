import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { Layout } from "../../components/LayoutAdmin";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const { Option } = Select;

let modifiedProducts = new Set();

const CategorySelect = ({ product, categories, handleCategoryChange }) => {
  const [category, setCategory] = useState(product.category.name);

  const onCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const foundCategory = categories.find(
      (category) => category.name === newCategory
    );
    handleCategoryChange(product, foundCategory);
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

const SaleCell = ({ product, handleSaleChange }) => {
  const [sale, setSale] = useState(product.sale);

  const onSaleChange = (newSale) => {
    setSale(newSale);
    console.log("New Sale: ", newSale);
    handleSaleChange(product, newSale);
    modifiedProducts.add(product._id);
  };

  return (
    <div>
      {sale === true ? (
        <button
          className="p-2 bg-emerald-300 rounded-[4px]"
          onClick={() => onSaleChange(!sale)}
        >
          Enabled
        </button>
      ) : (
        <button
          className="p-2 bg-red-200 rounded-[4px]"
          onClick={() => onSaleChange(!sale)}
        >
          Disabled
        </button>
      )}
    </div>
  );
};

const SaleRateCell = ({ product, handleSaleRateChange }) => {
  const [saleRate, setSaleRate] = useState(product.saleRate);

  const onSaleRateChange = (newSaleRate) => {
    newSaleRate = parseInt(newSaleRate);
    setSaleRate(newSaleRate);
    handleSaleRateChange(product, newSaleRate);
    modifiedProducts.add(product._id);
  };

  return (
    <input
      type="number"
      disabled={!product.sale}
      value={saleRate}
      onChange={(e) => onSaleRateChange(e.target.value)}
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
      name: "Sale",
      cell: (row) => (
        <SaleCell product={row} handleSaleChange={handleSaleChange} />
      ),
    },
    {
      name: "Sale Rate(%)",
      cell: (row) => (
        <SaleRateCell
          product={row}
          handleSaleRateChange={handleSaleRateChange}
        />
      ),
    },
    {
      name: "Remove",
      selector: (row) => (
        <button
          onClick={() => {
            handleDeleteProduct(row._id);
            console.log(row._id);
          }}
        >
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
      sale: data.sale,
      saleRate: data.saleRate,
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

  const handleSaleChange = (product, newSale) => {
    const updatedProducts = products.map((item) =>
      item._id === product._id ? { ...item, sale: newSale } : item
    );
    setProducts(updatedProducts);
  };

  const handleSaleRateChange = (product, newSaleRate) => {
    const updatedProducts = products.map((item) =>
      item._id === product._id ? { ...item, saleRate: newSaleRate } : item
    );
    setProducts(updatedProducts);
  };

  const handleCategoryChange = (product, newCategory) => {
    const updatedProducts = products.map((item) =>
      item._id === product._id ? { ...item, category: newCategory } : item
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${productId}`
      );
      if (response) {
        toast.success("Successfully deleted product");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
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

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#343434",
        backgroundColor: "#e7eef0",
      },
    },
    rows: {
      style: {
        color: "#343434",
        backgroundColor: "#ffffff",
      },
      stripedStyle: {
        color: "#343434",
        backgroundColor: "#ffffff",
      },
    },
  };

  return (
    <Layout>
      <div className="flex justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />

        <div className="w-[192.5vh] ml-10 mr-10 h-[100vh] py-[10vh]">
          <DataTable
            title="Manage Products"
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            striped
            customStyles={tableCustomStyles}
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
