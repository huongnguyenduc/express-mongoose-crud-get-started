const mongoose = require("mongoose");

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

// const p = new Product({
//   name: "Ruby Grapefruit",
//   price: 1.99,
//   category: "fruit",
// });

// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const seedProducts = [
  {
    name: "Ruby Grapefruit",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "Ruby Grape",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "Ruby fruit",
    price: 1.9,
    category: "fruit",
  },
  {
    name: "Grapefruit",
    price: 0.99,
    category: "fruit",
  },
];

Product.insertMany(seedProducts)
  .then((p) => {
    console.log(p);
  })
  .catch((err) => {
    console.log(err);
  });
