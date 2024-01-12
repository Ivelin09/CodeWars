const express = require("express");
const mongoose = require("mongoose");
const qrCodeRoutes = require("./routes/qr_code.routes");
mongoose.connect("mongodb://127.0.0.1:27017/codewars");
const server = express();

server.use(express.json());
server.use(qrCodeRoutes);

server.listen(3000, () => {
  console.log("Server is on");
});