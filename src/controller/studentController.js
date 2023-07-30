const { studentModel, applicationModel } = require("../models/studentModel");
const uploadFile = require("../utils/uploadFile");



const addApplication = async (req, res) => {
  try {
 

    // let { status, data } = await uploadFile(
    //   "name",
    //   "students",
    //   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
    // );
    // console.log(data,status,  "file uploaded")
    let num = Math.random() * 9999;
    let code = Math.floor(num);

    const application = new applicationModel({
      studentCode: code,
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
    await application.save();
    res.json({ message: "added" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};




const getApplications = async (req, res) => {
  try {
    const application = await applicationModel.find();
    console.log(application);
    res.json({
      message: "success",
      application,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await applicationModel.deleteOne({
      studentCode: req.body.studentCode,
    });
    const applications = await applicationModel.find();
    console.log(application);
    res.json({
      message: "success",
      applications,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
};

const addStudents = async (req, res) => {
  try {
    const students = await applicationModel.find({ email: req.body.email });
    const addStudent = await studentModel.insertMany(students);
    const deleteApplication = await applicationModel.deleteOne({
      email: req.body.email,
    });
    const applications = await applicationModel.find();

    console.log(students, "added");
    res.json({
      message: "success",
      applications,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
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

const payFees = async (req, res) => {
  try {
    const student = await studentModel.updateOne(
      {
        email: req.body.email,
        fees: { $elemMatch: { month: req.body.month } },
      },
      { $set: { "fees.$.status": "Submitted" } }
    );
    console.log("updated", req.body);
    res.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
};

const getIndividualStudent = async (req, res) => {
  try {
    const students = await studentModel.find({ email: req.body.email });

    console.log(students);
    res.json({
      message: "success",
      response: students[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "error",
    });
  }
};

module.exports = {
  addApplication,
  getStudents,
  getApplications,
  addStudents,
  deleteApplication,
  payFees,
  getIndividualStudent,
};
