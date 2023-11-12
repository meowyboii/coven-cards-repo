const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const stripeCheckoutRoute = require("./routes/stripeCheckoutRoute");
const stripeWebhookRoute = require("./routes/strieWebhookRoute");
const orderRoute = require("./routes/orderRoute");
const multer = require('multer')
const uploadApp = express();
const port = 3001;

// Set up file storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

uploadApp.use(express.json());

// Serve uploaded files statically
uploadApp.use('/uploads', express.static('uploads'));

uploadApp.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

uploadApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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

app.use(express.static("public"));
//stripe webhook route
app.use("/api/v1/stripe", stripeWebhookRoute);
app.use(express.json());

//routes
app.use("/api/v1/stripe", stripeCheckoutRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000");
});
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});
