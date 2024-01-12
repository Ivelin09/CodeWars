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
  if (!document) return 0;
  if (document.attempts < 5) return { timeout: new Date().getDate() };

  return new Date().getDate() + 1000 * 30;
};

module.exports = {
  validateQRCodeModel: mongoose.model("validateQRCode", validateQrCodeSchema),
  validateQrCodeSchema,
  getTimeout,
};
