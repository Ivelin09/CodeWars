const mongoose = require("mongoose");
const { Schema }= require("mongoose");

const qrCodeSchema = new Schema({
    mixed_qr_code: String,
    valid_qr_code: String
});

module.exports = {QrCodes: mongoose.model("QrCodes", qrCodeSchema), QrCodesSchema: qrCodeSchema};