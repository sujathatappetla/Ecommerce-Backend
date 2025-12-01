import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    sizes: { type: [String], default: [] }, // Array of sizes: ["S", "M", "L"]
    stock: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
