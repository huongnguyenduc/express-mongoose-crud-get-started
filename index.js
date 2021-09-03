const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!");
    console.log(err);
  });
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/product", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

app.get("/product/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render("products/show", { product });
});
app.get("/product/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render("products/edit", { product, categories });
});

app.post("/product", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/product/${newProduct._id}`);
});

app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/product/${product._id}`);
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndRemove(id);
  res.redirect("/product");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
