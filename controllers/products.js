const Product = require("../models/products");
const getAllProducts = async (req, res) => {
  let result = Product.find(queryObj);
  const { featured, name, company, sort, select, limit, page } = req.query;
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

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }

  if (limit) {
    result = result.limit(limit);
  }
  if (page) {
    result = result.page(page);
  }
  const products = await result;
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
