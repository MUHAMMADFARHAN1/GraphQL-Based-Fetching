import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../modules/product/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

//The slug is for findone method not for id where it will work
//router.get("/:slug", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
