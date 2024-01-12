const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { validateQrCodeSchema } = require("./requests.types.schema");

const Request = new Schema({
  request_date_sent: {
    type: Date,
  },
  type: {
    type: [validateQrCodeSchema],
  },
});

module.exports = {
  Request: mongoose.model("Request", Request),
  RequestSchema: Request,
};
