const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");

//configure env
require("dotenv").config();

//configure DB
connectDB();

//configure express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000");
});
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});
