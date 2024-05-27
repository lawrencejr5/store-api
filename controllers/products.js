const express = require("express");
const Product = require("../models/products");
const getAllProducts = async (req, res) => {
  const { featured, name, company } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  const products = await Product.find(queryObj);
  console.log(queryObj);
  res.status(200).json({ rowCount: products.length, products });
};

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({ company: "liddy" });
  res.status(200).json({ rowCount: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllStaticProducts,
};
