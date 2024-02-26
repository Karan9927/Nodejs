const fs = require("fs");
const express = require("express");
const server = express();

const productList = require("./product.json");

const writeFile = (logString) => {
  fs.appendFileSync("access.log", logString + "\n");
};

server.use((req, res, next) => {
  const startTime = new Date();
  writeFile(
    `HTTP Method: ${req.method} Requested URL: ${req.url}, Time: ${startTime}, IP: ${req.ip}`
  );

  next();

  res.on("finish", () => {
    const endTime = new Date();
    const elapsedTime = endTime - startTime;
    writeFile(`Time taken: ${elapsedTime}ms`);
  });
});

server.get("/product-list", (req, res) => {
  if (req.query.searchKey) {
    const filteredResults = productList.filter((product) =>
      product.title.toLowerCase().includes(req.query.searchKey)
    );
    res.json({
      success: true,
      total: filteredResults.length,
      results: filteredResults,
    });
  } else {
    res.json({
      success: true,
      results: productList,
    });
  }
});

server.use((err, req, res, next) => {
  console.log("Error occured");
});

server.get("/product-list/:id", (req, res) => {
  const productId = parseInt(req.params.id); // Convert ID to integer if necessary
  const product = productList.find((product) => product.id === productId); // Use strict equality
  if (!product) {
    return res.json({
      success: false,
      message: "Product not found!",
    });
  } else {
    res.json({
      success: true,
      results: product,
    });
  }
});

server.listen(5000, () => {
  console.log("Server is runnning at port 5000");
});
