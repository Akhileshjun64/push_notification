const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  message: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  imagefile: {
    type: String,
    default: "",
  },
});
const Product = new mongoose.model("testing", ProductSchema);
module.exports = Product;
