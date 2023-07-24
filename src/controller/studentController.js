const { studentModel } = require("../models/studentModel");

const addStudent = async (req, res) => {
  try {
    const students=await studentModel.find()
    console.log(students.length);
    const student = new studentModel({
      studentCode:students.length+1 ,
      name: req.body.name,
      fatherName: req.body.fatherName,
      cnic: req.body.cnic,
      email: req.body.email,
      phone: req.body.phone,
      class: req.body.class,
      status: req.body.status,
      qualification:req.body.qualification,
      address:req.body.address,
      dob:req.body.dob
    });
    await student.save();
    console.log("added student");
    res.send("added");
  } catch (error) {
    console.log(error);
    res.send(error)
  }
 
};

const getStudents=async(req,res)=>{
  try {
    const students=await studentModel.find()
    console.log(students);
    res.json({
      message:"success",
      students
    })
  } catch (error) {
    console.log(error);
    res.json({
      message:"error"
    })
  }
}

module.exports = { addStudent ,getStudents};
