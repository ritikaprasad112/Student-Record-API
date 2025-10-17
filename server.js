const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/students");

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

//fetching all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//adding new students
app.post("/students", async (req, res) => {
  try {
    const { name, course, age, city } = req.body;
    //validating name & course
    if (!name || !course) {
      return res.status(400).json({ error: "Name and Course are required" });
    }
    const newStudent = new Student({ name, course, age, city });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

//updating student data
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = Number(req.params);
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedStudent) {
      res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: " Server Error" });
  }
});

//deleting students
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
