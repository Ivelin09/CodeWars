const mongoose = require("mongoose");
const { QrCodesSchema } = require("./qr_code.schema");
const { RequestSchema } = require("./request.schema");
const userSchema = new mongoose.Schema({
  qr_codes: [QrCodesSchema],
  auth_token: {
    type: String,
    required: true,
  },
  requests: [RequestSchema],
  solved_qr_codes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Users", userSchema);
