require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 8000;

const connection = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
});

connection.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

connection.end();

app.get("/", (req, res) => res.send("Hello! Internet Programming 2Team"));
app.listen(PORT, () => console.log("Test app listening on port 8000!"));
