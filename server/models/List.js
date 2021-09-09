const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
