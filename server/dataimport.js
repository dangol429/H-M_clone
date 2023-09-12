const mongoose = require("mongoose");
const Category = require("./models/categories_model"); // Import your Category model

mongoose.connect("mongodb+srv://prathamdangol:shiwam12345@cluster0.hwhltgv.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", async () => {
  // Assuming you have an array of sample categories
  const sampleCategories = [
    "Shirt",
    "Pant",
    "Shoes",
    "Jeans",
    "Skirts",
    "Tshirts",
  ];

  try {
    // Insert the categories into the database
    await Category.insertMany(sampleCategories.map(categoryName => ({ categories: categoryName })));
    console.log("Sample categories inserted successfully");
  } catch (error) {
    console.error("Error inserting sample categories:", error);
  } finally {
    // Close the MongoDB connection when done
    mongoose.connection.close();
  }
});
