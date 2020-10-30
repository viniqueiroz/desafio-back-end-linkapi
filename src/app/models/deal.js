const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    value: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    pipedrive_id: {
      type: Number,
      required: true
    },
    bling_id: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Deal", DealSchema);