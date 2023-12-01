const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public")); // Serve static files
require("./database");
const model = require("./model");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/product", upload.single("imagefile"), async (req, res) => {
  try {
    const data = new model(req.body);
    if (req.file) {
      data.imagefile = req.file.filename;
    }
    await data.save();
    res.send({ result: "Done", message: "Product is Created!!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "Error", message: "Internal Server Error" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const data = await model.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8001, () => console.log("Server is running at 8000 port"));
