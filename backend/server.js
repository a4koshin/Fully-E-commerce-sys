const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

//Router configuration
const ProviderRoute = require("./routes/provider");
const SetupRoute = require("./routes/setup");
const MenuRoute = require("./routes/menu");
const ItemRoute = require("./routes/item");
const UserRoute = require("./routes/user");
const OrderRoute = require("./routes/order");
const CouponCodeRoute = require("./routes/coupon");
const DriverRoute = require("./routes/driver");
const CategoryRoute = require("./routes/category");
const LocationRouter = require("./routes/location");
const DeliveryRouter = require("./routes/delivery");
const ReviewRoutes = require("./routes/Reviews");
const FavoriteRoutes = require("./routes/favorite");
// Configuration
dotenv.config();
const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// comperssion app
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use("/api/providers", ProviderRoute);
app.use("/api/favorite", FavoriteRoutes);
app.use("/api/setup", SetupRoute);
app.use("/api/menus", MenuRoute);
app.use("/api/items", ItemRoute);
app.use("/api/users", UserRoute);
app.use("/api/order", OrderRoute);
app.use("/api/coupon", CouponCodeRoute);
app.use("/api/driver", DriverRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/location", LocationRouter);
app.use("/api/delivery", DeliveryRouter);
app.use("/api/reviews", ReviewRoutes);

const loadModels = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // If it's a directory, recurse into it
      loadModels(fullPath);
    } else if (file.endsWith(".js")) {
      // If it's a JavaScript file, require it
      require(fullPath);
      console.log(`Loaded model: ${fullPath}`);
    }
  });
};

// Main function to load models
const modelsPath = path.join(__dirname, "models");
loadModels(modelsPath);
// Mongoose setup
const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
