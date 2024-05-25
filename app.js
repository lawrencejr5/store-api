require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const ConnectDB = require("./db/conn");
const productsRouter = require("./routes/products");

//middleware import
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h1>Index route</h1><a href='/api/v1/products'>Go to products route</a>"
  );
});
app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const startServer = async () => {
  try {
    // Connect DB
    await ConnectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`App listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};
startServer();
