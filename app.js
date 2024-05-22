require("dotenv").config();

const express = require("express");
const app = express();

// Not found middleware import
const notFound = require("./middleware/notFound");

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store Api</h1><br/><a href='/products'>Get products</a>");
});

app.use(notFound);

const port = process.env.PORT || 3000;
const startServer = async () => {
  try {
    // Connect DB
    app.listen(port, console.log(`App listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};
startServer();
