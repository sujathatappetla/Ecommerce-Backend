import Product from "../models/Product.js";

// -------------------- GET ALL PRODUCTS WITH FILTERS --------------------
export const getProducts = async (req, res) => {
  try {
    const { category, size, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;

    // Build dynamic filter object
    const filter = {};

    // Search (case insensitive)
    if (search) {
  filter.$or = [
    { name: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
  ];
}


    // Category filter
    if (category) {
      filter.category = category;
    }

    // Size filter (checks if size exists in sizes array)
    if (size) {
      filter.sizes = size;
    }

    // Price Range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Pagination settings
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      total: totalProducts,
      page: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------- GET SINGLE PRODUCT --------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid product ID" });
  }
};
