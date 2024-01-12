const express = require("express");
const server = express();
const mongoose = require("mongoose");
const qrCodeRoutes = require("./routes/qr_code.routes");
const initializeDB = require("./schemas/initData");

initializeDB();

server.use(express.json());
server.use(qrCodeRoutes);
server.use((req, res) => {
  res.json({
    message: "Не съществува такъв endpdoint",
  });
});

server.listen(3000, () => {
  console.log("Server is on");
});
