import express from "express";
import { addCategory, addProduct, addSubCategory, getAllCategories } from "../controller/productController.js";
const router = express.Router();

 router.post('/addProduct',addProduct)
 router.post('/addCategory',addCategory)
router.post('/addSubCategory', addSubCategory)
 router.get("/categories", getAllCategories);
export default router;
