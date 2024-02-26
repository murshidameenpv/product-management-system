import express from "express";
import {
  addCategory,
  addProduct,
  getAllProducts,
  addSubCategory,
  getAllCategories,
} from "../controller/productController.js";
const router = express.Router();

 router.post('/addProduct',addProduct)
 router.post('/addCategory',addCategory)
router.post('/addSubCategory', addSubCategory)
router.get("/categories", getAllCategories);
 router.get("/getProducts",getAllProducts)
export default router;
