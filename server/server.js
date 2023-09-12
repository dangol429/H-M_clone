const express = require("express")

//Models Import
require("./models/product_model");
require("./models/user_model");
require("./models/categories_model");
require("./models/review_model");
require("./models/cart_model");
require("./models/order_model");
require("./models/address_modal");

const ProductRouter = require("./router/product_router");
const userRouter = require("./router/user_router");
const categoriesRouter = require("./router/categories_router");
const reviewRoutes = require("./router/review_routes");
const cartRouter = require("./router/cart_router");
const addressRouter = require("./router/address_router");
const orderRoutes = require("./router/order_routes");

const PORT = 5000;
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const {MONGODB_URL} = require('./config')
const path = require("path");

global.__basedir = __dirname;
mongoose.connect(MONGODB_URL)

mongoose.connection.on('connected', () => {
    console.log("DB connected")
})

mongoose.connection.on("error", (error) => {
    console.log("Some error while connecting to DB")
})

app.use(cors())
app.use(express.json({ limit: "20mb"}))
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//For getting the paypal api
app.get("/api/keys/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
  });
  
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/products", ProductRouter);
app.use("/api/user", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
    console.log("server has started")
})