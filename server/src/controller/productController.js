import categoryDb from "../model/categorySchema.js";
import productDb from "../model/productSchema.js";

export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      subCategory,
      price,
      quantity,
      description,
      images,
      variant,
    } = req.body;

    const newProduct = new productDb({
      productName,
      category,
      subCategory,
      price,
      quantity,
      description,
      images,
      variant,
    });

    await newProduct.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productDb.find({});
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productDb.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Error fetching product" });
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
