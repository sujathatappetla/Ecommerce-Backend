import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  
  getCart,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/remove/:productId/:size", authMiddleware, removeCartItem);


router.delete("/remove/all", authMiddleware, clearCart);

export default router;
