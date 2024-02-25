import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }, 
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  variant: {
    type: String,
    enum: ["4GB", "8GB", "16GB", "32GB", "64GB"],
    required: true,
  },
},{timestamps:true});

const productDb = mongoose.model("Product", productSchema);
export default productDb;
