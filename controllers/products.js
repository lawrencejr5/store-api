const Product = require("../models/products");
const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, select } = req.query;
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
  let result = Product.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  console.log(queryObj);
  res.status(200).json({ rowCount: products.length, products });
};

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({})
    .select("name price")
    .limit(10)
    .sort("name")
    .skip(10);
  res.status(200).json({ rowCount: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllStaticProducts,
};
