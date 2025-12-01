import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; 

dotenv.config();

const products = [
  {
    name: "Yoga Top",
    description: "Breathable yoga top for workouts.",
    price: 799,
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
    category: "Activewear",
    sizes: ["S", "M", "L"],
    stock: 22,
  },
  {
    name: "Running Shoes",
    description: "Lightweight shoes for running and training.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1618266727798-6c00e3295652",
    category: "Footwear",
    sizes: ["7", "8", "9", "10"],
    stock: 30,
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1534126511673-b6899657816a",
    category: "Jackets",
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
  },
  {
    name: "Casual Shirt",
    description: "Slim fit checked casual shirt.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 18,
  },
  {
    name: "Printed T-Shirt",
    description: "Soft cotton printed round-neck tee.",
    price: 599,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    category: "Men",
    sizes: ["M", "L"],
    stock: 50,
  },
  {
    name: "Women's Floral Dress",
    description: "Soft summer floral dress with belt.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1520975928318-3a4c00ad1d9e",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 12,
  },
  {
    name: "Formal Blazer",
    description: "Premium office formal blazer.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1592878904946-b0cf448d2ea8",
    category: "Formal",
    sizes: ["M", "L", "XL"],
    stock: 10,
  },
  {
    name: "Cotton Sweatshirt",
    description: "Warm fleece sweatshirt for winter.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1618354691250-465bd2d96c60",
    category: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
  {
    name: "Sports Shorts",
    description: "Quick dry breathable shorts.",
    price: 599,
    image: "https://images.unsplash.com/photo-1600180758895-445a0b8574f6",
    category: "Activewear",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather handmade wallet.",
    price: 799,
    image: "https://images.unsplash.com/photo-1591076482161-42f0201c479b",
    category: "Accessories",
    stock: 100,
    sizes: []
  },
  {
    name: "Baseball Cap",
    description: "Adjustable cotton baseball cap.",
    price: 499,
    image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5",
    category: "Accessories",
    stock: 60,
    sizes: []
  },
  {
    name: "Black Hoodie",
    description: "Oversized black streetwear hoodie.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1596755389379-75b0b05d4f87",
    category: "Winterwear",
    sizes: ["M", "L"],
    stock: 22,
  },
  {
    name: "Cargo Pants",
    description: "Loose fit pocket cargo pants.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1602810318383-e0a4f668bb46",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 30,
  },
  {
    name: "White Sneakers",
    description: "Minimal premium sneakers.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    category: "Footwear",
    sizes: ["7", "8", "9", "10"],
    stock: 20,
  },
  {
    name: "Silk Saree",
    description: "Traditional pure silk saree.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "Women",
    stock: 8,
    sizes: []
  },
  {
    name: "Kids T-Shirt",
    description: "Soft cartoon print T-shirt.",
    price: 349,
    image: "https://images.unsplash.com/photo-1602810312781-b2326b9e5723",
    category: "Kids",
    sizes: ["XS", "S"],
    stock: 70,
  },
  {
    name: "Track Pants",
    description: "Comfort slim fit track pants.",
    price: 999,
    image: "https://images.unsplash.com/photo-1621072151354-7f425e90e299",
    category: "Activewear",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Office Shoes",
    description: "Formal black leather shoes.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1624190348881-625b0193f1df",
    category: "Footwear",
    sizes: ["7", "8", "9", "10"],
    stock: 14,
  },
  {
    name: "Wool Jacket",
    description: "Premium warm wool jacket.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1600180757361-546a2dfc3a67",
    category: "Winterwear",
    sizes: ["M", "L"],
    stock: 9,
  },
  {
    name: "Party Dress",
    description: "Beautiful embroidered party dress.",
    price: 2799,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8df",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 11,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 Connected to DB");

    await Product.deleteMany({});
    console.log("🗑 Old products deleted");

    await Product.insertMany(products);
    console.log("✨ 20 Products inserted successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
