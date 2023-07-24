const express = require("express");
const app = express();
const port = 8000;
////////////////////////////////file imports/////////////////////////
const db = require("./src/config/dbConnection");
const bodyParser = require("body-parser");
const cors = require("cors");

const addStudent=require("./src/routes/studentRoutes")
const users = require("./src/routes/userRoutes");

/////////////////////////////////using and calling functions////////// 
require("dotenv").config();
db.dbConnection();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///////////////////////////routes///////////////////////////////
app.use("/students", addStudent);
app.use("/auth", users);

/////////////////////////////listning node server/////////////////
app.listen(port, () => {
  console.log("server running");
});
