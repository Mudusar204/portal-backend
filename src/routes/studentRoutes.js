const express = require("express");

const routes = express.Router();

const { addStudent,getStudents } = require("../controller/studentController");

routes.post("/addStudent", addStudent);
routes.get("/getStudent", getStudents);

module.exports = routes;
