const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const productModel = require("../models/productModel");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name) {
      return res.status(500).send({ error: "Name is Required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is Required" });
    }
    if (!price) {
      return res.status(500).send({ error: "Price is Required" });
    }
    if (!category) {
      return res.status(500).send({ error: "Category is Required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "Quantity is Required" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        error: "Photo is required and should be less than 1 mb",
      });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to create a product",
      error,
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      totalCount: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Retrieved Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting the product",
      error,
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting the product photo",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting the product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, stock, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name) {
      return res.status(500).send({ error: "Name is Required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is Required" });
    }
    if (!price) {
      return res.status(500).send({ error: "Price is Required" });
    }
    if (!category) {
      return res.status(500).send({ error: "Category is Required" });
    }
    if (!stock) {
      return res.status(500).send({ error: "Stock is Required" });
    }
    if (photo && photo.size > 2000000) {
      return res.status(500).send({
        error: "Photo is required and should be less than 1 mb",
      });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in updating the product",
      error,
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Product API",
      error,
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  searchProductController,
};
