import categoryDb from "../model/categorySchema.js";

export const addProduct = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    console.log(categoryName);
    const existingCategory = await categoryDb.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    await categoryDb.create({ categoryName });
    res.status(200).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Adding Category" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryDb.find({});
    if (!categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Categories" });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.body;
    const category = await categoryDb.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    if (
      category.subCategories.find(
        (sub) => sub.subCategoryName === subCategoryName
      )
    )
      return res.status(400).json({ message: "Subcategory already exists" });

    category.subCategories.push({ subCategoryName });
    await category.save();
    res.status(200).json({ message: "Subcategory added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding subcategory" });
  }
};
