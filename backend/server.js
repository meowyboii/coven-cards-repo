const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const stripeCheckoutRoute = require("./routes/stripeCheckoutRoute");
const stripeWebhookRoute = require("./routes/strieWebhookRoute");
const orderRoute = require("./routes/orderRoute");
const multer = require("multer");
const uploadApp = express();
const sanitize = require("sanitize-filename");
const path = require("path");
const fs = require("fs");
const port = 3001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.body.folderName || "defaultFolder";
    const destinationPath = path.join(
      __dirname,
      `../client/src/assets/img/products/${folderName}/`
    );

    // Create the folder if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    console.log("Destination Path:", destinationPath);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = sanitize(file.originalname);
    cb(null, sanitizedFilename);
  },
});

const upload = multer({ storage: storage });

uploadApp.use(cors());
uploadApp.use(express.json()); // Parse JSON bodies

uploadApp.use("../client/src/assets/img/products/", express.static("uploads"));

uploadApp.post("/upload", upload.fields([{ name: "files" }]), (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the entire request body for inspection
    const folderName = req.body.folderName || "defaultFolder";
    const destinationPath = path.join(
      __dirname,
      `../client/src/assets/img/products/${folderName}/`
    );

    // Create the folder if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Move each file to the destination folder
    req.files["files"].forEach((file) => {
      const filePath = path.join(destinationPath, file.originalname);
      fs.renameSync(file.path, filePath);
    });

    console.log("Destination Path:", destinationPath);
    res.json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
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

uploadApp.get("/photos", (req, res) => {
  const folderName = req.query.folderName || "defaultFolder";
  const folderPath = path.join(
    __dirname,
    `../client/src/assets/img/products/${folderName}`
  );

  // Read the files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    } else {
      res.json(files);
    }
  });
});
