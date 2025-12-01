import Cart from "../models/Cart.js";

// ADD TO CART 
export const addToCart = async (req, res) => {
  const { product, size, qty } = req.body;

  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, create one
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product, size, qty }],
      });

      await cart.populate("items.product");
      return res.status(201).json({ items: cart.items });
    }

    // Check if product already exists with same size
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product && item.size === size
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ product, size, qty });
    }

    await cart.save();
    await cart.populate("items.product");
    return res.json({ items: cart.items });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ITEM 
export const updateCartItem = async (req, res) => {
  const { product, size, qty } = req.body;

  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === product && i.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;

    await cart.save();
    await cart.populate("items.product");
    return res.json({ items: cart.items });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE ITEM 
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();
    await cart.populate("items.product");
    return res.json({ items: cart.items });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CAR
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return res.json({ items: [] });

    res.json({ items: cart.items });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CLEAR CART 
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.json({ message: "Cart already empty" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", items: [] });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
