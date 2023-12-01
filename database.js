const mongoose = require("mongoose");

// Set strictQuery to true to suppress the warning
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.mongo_Cloud_DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
