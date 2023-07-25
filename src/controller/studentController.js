const { studentModel } = require("../models/studentModel");
const multer = require("multer");
const uploadFile = require("../utils/uploadFile");
// const uploadFile = require("../assets/images/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/assets/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1000);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage });
const addStudent = async (req, res) => {
  try {
    upload.single("file"),
      async (req, res) => {
        if (!req.file) {
          return res.status(400).json({ error: "No file received" });
        }
        let { status, data } = await uploadFile(
          "name",
          "interviewQuestions",
          "../assets/images/file-285.png"
        );
        console.log(status, data, "file uploaded");
        const students = await studentModel.find();
        console.log(students.length);
        const student = new studentModel({
          studentCode: students.length + 1,
          name: req.body.name,
          fatherName: req.body.fatherName,
          cnic: req.body.cnic,
          email: req.body.email,
          phone: req.body.phone,
          class: req.body.class,
          status: req.body.status,
          qualification: req.body.qualification,
          address: req.body.address,
          dob: req.body.dob,
        });
        await student.save();
        console.log("added student");
        res.send("added");
      };
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await studentModel.find();
    console.log(students);
    res.json({
      message: "success",
      students,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
};

module.exports = { addStudent, getStudents };
