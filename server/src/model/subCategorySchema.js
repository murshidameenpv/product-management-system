import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  categoryName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const subCategoryDb = mongoose.model("SubCategory", subCategorySchema);
export default subCategoryDb;