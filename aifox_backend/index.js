require('dotenv').config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan")
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const documentsRoutes = require("./routes/documentsRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes.js")

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connected")).catch((err)=>console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
app.use("/conversations", conversationRoutes);
app.use("/documents", documentsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "<h1>welcome to Gen - Ai Server </h1>"
  });

});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(
    `server Running on ${PORT}`
  );
});
