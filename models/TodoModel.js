const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
