const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const stripeRoute = require("./routes/stripeRoute");

//configure env
require("dotenv").config();

//configure DB
connectDB();

//configure express
const app = express();

//configure allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.paypal.com/tagmanager/pptm.js?id=localhost&source=checkoutjs&t=xo&v=4.0.338",
];

//middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowedOrigins array
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//stripe route

app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api/v1/stripe", stripeRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000");
});
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});
