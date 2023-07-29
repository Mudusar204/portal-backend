const express = require("express");

const routes = express.Router();

const { addApplication,getStudents,getApplications ,addStudents,deleteApplication,payFees,getIndividualStudent} = require("../controller/studentController");

routes.post("/addApplication", addApplication);
routes.get("/getApplications", getApplications);
routes.post("/deleteApplication", deleteApplication);
routes.get("/getStudent", getStudents);
routes.post("/addStudent", addStudents);
routes.post("/payFees", payFees);
routes.post("/getIndividualStudent", getIndividualStudent);


module.exports = routes;
