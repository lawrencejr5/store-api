require("dotenv").config();

const ConnectDB = require("./db/conn");
const Product = require("./models/products");

const jsonProducts = require("./products.json");

const populate = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Done my guy");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
populate();
