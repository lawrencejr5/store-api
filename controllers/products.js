const express = require("express");

const getAllProducts = async (req, res) => {
  //   throw new Error("error");
  return res.status(200).json({ msg: "All products" });
};

const getAllStaticProducts = async (req, res) => {
  //   throw new Error("error");
  return res.status(200).json({ msg: "All static products" });
};

module.exports = {
  getAllProducts,
  getAllStaticProducts,
};
