const mongoose = require("mongoose");
const ProductModel = require("./models/product_model"); // Import your ProductModel

mongoose.connect("mongodb+srv://prathamdangol:shiwam12345@cluster0.hwhltgv.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", async () => {
  // Assuming you have an array of sample products
  const sampleProducts = [
    {
      productName: 'Basic White T-Shirt',
      img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
      price: 12.99,
      categories: 't-shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      desc: 'A classic white t-shirt for everyday wear.',
      rating: 4.5,
      totalReviews: 120,
      inStock: true,
    },
    {
      productName: 'Graphic Print T-Shirt',
      img: 'https://images.unsplash.com/photo-1676113421579-55b8d5c73225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1924&q=80',
      price: 19.99,
      categories: 't-shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      desc: 'A trendy t-shirt with a cool graphic print.',
      rating: 4.7,
      totalReviews: 85,
      inStock: true,
    },
    // Add more t-shirts here...
  
    // Shirts
    {
      productName: 'Striped Button-Up Shirt',
      img: 'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3f%2F71%2F3f714cce95c4362d6c644ff6c2d169cc93951cc2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
      price: 29.99,
      categories: 'shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      desc: 'A stylish striped button-up shirt for any occasion.',
      rating: 4.4,
      totalReviews: 65,
      inStock: true,
    },
    {
      productName: 'Denim Shirt',
      img: 'https://lp.arket.com/app006prod?set=quality%5B79%5D%2Csource%5B%2Fee%2F75%2Fee75814bd1b73edbe5cdcc976f38c6bf88c8164a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D%2Ctarget%5Bhm.com%5D&call=url[file:/product/main]',
      price: 39.99,
      categories: 'shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      desc: 'A classic denim shirt for a rugged look.',
      rating: 4.6,
      totalReviews: 72,
      inStock: true,
    },
    // Add more shirts here...
  
    // Pants
    {
      productName: 'Slim Fit Chinos',
      img: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff4%2Feb%2Ff4eb4395fb18239b6f591df312342edb85e04c51.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
      price: 34.99,
      categories: 'pant',
      sizes: ['30W 32L', '32W 32L', '34W 32L', '36W 32L'],
      desc: 'Slim fit chinos for a modern look.',
      rating: 4.3,
      totalReviews: 58,
      inStock: true,
    },
    {
      productName: 'Cargo Pants',
      img: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F2e%2F45%2F2e45ff7c2e69d7bf108839d98e33b68ae3e89a06.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
      price: 44.99,
      categories: 'pant',
      sizes: ['30W 32L', '32W 32L', '34W 32L', '36W 32L'],
      desc: 'Versatile cargo pants with plenty of pockets.',
      rating: 4.2,
      totalReviews: 70,
      inStock: true,
    },
    // Add more pants here...
  
    // Shoes
    {
      productName: 'Sneakers',
      img: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F81%2F98%2F8198b307263f0edb1ad4de960b07779f5c360f5a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_divided_shoes%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]',
      price: 49.99,
      categories: 'shoes',
      sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
      desc: 'Comfortable sneakers for casual wear.',
      rating: 4.8,
      totalReviews: 95,
      inStock: true,
    },
    {
      productName: 'Leather Dress Shoes',
      img: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6b%2Fc8%2F6bc87c3271badf53455fb2b820c009a6456d9473.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shoes_dressed%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
      price: 79.99,
      categories: 'shoes',
      sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
      desc: 'Elegant leather dress shoes for formal occasions.',
      rating: 4.7,
      totalReviews: 82,
      inStock: true,
    },
    // Add more shoes here...
  
    // Skirts
    {
      productName: 'Pleated Midi Skirt',
      img: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F06%2Faa%2F06aa5de4e3df6ef234fa50dacf28de32ab73e982.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
      price: 29.99,
      categories: 'skirt',
      sizes: ['XS', 'S', 'M', 'L'],
      desc: 'A trendy pleated midi skirt for a chic look.',
      rating: 4.6,
      totalReviews: 68,
      inStock: true,
    },
    {
      productName: 'Floral Print Skirt',
      img: 'https://example.com/floral-skirt.jpg',
      price: 24.99,
      categories: 'skirt',
      sizes: ['XS', 'S', 'M', 'L'],
      desc: 'A floral print skirt perfect for summer.',
      rating: 4.5,
      totalReviews: 74,
      inStock: true,
    },
    // Add more skirts here...
  
    // Jeans
    {
      productName: 'Skinny Jeans',
      img: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe1%2F96%2Fe1962f326ec85b935bd60fba02198c0458528db2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
      price: 39.99,
      categories: 'jeans',
      sizes: ['28W 30L', '30W 30L', '32W 30L', '34W 30L'],
      desc: 'Trendy skinny jeans for a modern look.',
      rating: 4.4,
      totalReviews: 60,
      inStock: true,
    },
    {
      productName: 'Straight Leg Jeans',
      img: 'https://example.com/straight-jeans.jpg',
      price: 34.99,
      categories: 'jeans',
      sizes: ['28W 30L', '30W 30L', '32W 30L', '34W 30L'],
      desc: 'Classic straight leg jeans for everyday wear.',
      rating: 4.3,
      totalReviews: 55,
      inStock: true,
    },
    // Add more products as needed
  ];

  try {
    // Create an instance of ProductModel and use insertMany
    await ProductModel.insertMany(sampleProducts);
    console.log("Sample products inserted successfully");
  } catch (error) {
    console.error("Error inserting sample products:", error);
  } finally {
    // Close the MongoDB connection when done
    mongoose.connection.close();
  }
});
