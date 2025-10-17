const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  course: {
    typr: String,
    required: [true, "Course is required"],
  },
  age: {
    type: Number,
    default: null,
  },
  city: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Student", studentSchema);
