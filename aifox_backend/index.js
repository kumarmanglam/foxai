const express =require(express);
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
const documentsRoutes = require("./routes/documentsRoutes.js");
dotenv.config(); 
mongoose.connect("mongodb://localhost:27017/").then(()=>console.log("DB Connected")).catch((err)=>console.log(err));

const app = express(); 
app.use(cors());
app.use(express.json());
// app.use(morgan("dev")); 
// app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
// app.use("/conversation",conversationRoutes);
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