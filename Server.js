const express = require("express");
const app = express();
const port = 8000;
////////////////////////////////file imports/////////////////////////
const db = require("./src/config/dbConnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const studentRoutes=require("./src/routes/studentRoutes")
const users = require("./src/routes/userRoutes");

/////////////////////////////////using and calling functions////////// 
require("dotenv").config();
db.dbConnection();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////////////multer////////////////////////////
// let a=null
// const storage = multer.diskStorage({
  
//   destination: function (req, file, cb) {
//     cb(null, './src/assets/images');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Math.round(Math.random() * 1000)
//     a=uniqueSuffix
//     cb(null, file.fieldname + '-' + uniqueSuffix+".png");
//   },
// });

// const upload = multer({storage });

// app.post('/upload', upload.single('file'), async(req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file received' });
//   }
 
//   res.json({ message: 'File uploaded successfully',path:`file-${a}.png` });
// });


///////////////////////////routes///////////////////////////////
app.use("/student", studentRoutes);
app.use("/auth", users);

/////////////////////////////listning node server/////////////////
app.listen(port, () => {
  console.log("server running");
});
