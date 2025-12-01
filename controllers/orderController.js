import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { sendOrderEmail } from "../utils/sendEmail.js";

export const placeOrder = async (req, res) => {
  try {
    console.log("📦 Order API hit:", req.user);

    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // STOCK VALIDATION 
   
    for (let item of cart.items) {
  if (item.qty > item.product.stock) {
    return res.status(400).json({
      message: `Stock Low: Only ${item.product.stock} items left for ${item.product.name}.`,
    });
  }
}

    // REDUCE STOCK AFTER VALIDATION 
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.qty },
      });
    }

    // CALCULATE TOTAL 
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.qty * item.product.price,
      0
    );

    //  CREATE ORDER 
    const order = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        qty: item.qty,
      })),
      totalPrice,
      status: "pending",
    });

    //  CLEAR CART 
    cart.items = [];
    await cart.save();

    // SEND EMAIL 
    await sendOrderEmail(req.user.email, order);

    res.status(201).json({ message: "Order placed successfully", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
