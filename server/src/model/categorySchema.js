import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subCategories: [{
    subCategoryName: {
      type: String,
      required: true,
    },
  }],
});


const categoryDb = mongoose.model("Category", categorySchema);
export default categoryDb;
