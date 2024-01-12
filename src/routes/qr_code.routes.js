const express = require("express");
const qrCodeController = require("../controllers/qr_code.controller.js");
const authorize = require("../middleware/authroization.middleware.js");

const router = express.Router();

router.get("/qr_code", authorize, qrCodeController.get);
router.post("/qr_code", authorize, qrCodeController.post);

module.exports = router;
