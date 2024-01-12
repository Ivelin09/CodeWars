const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const validateQrCodeSchema = new Schema({
  requestName: {
    type: "String",
    default: "validateQRCode",
  },
  attempts: {
    type: Number,
    default: 0,
  },
  timeout: {
    type: Date,
  },
  is_last_solved: {
    type: Boolean,
  },
});

const getTimeout = (document) => {
  if (document.attempts < 3) return;

  return { timeout: new Date().getDate() + 1000 * 15 };
};

module.exports = {
  validateQRCodeModel: mongoose.model("validateQRCode", validateQrCodeSchema),
  validateQrCodeSchema,
  getTimeout,
};
