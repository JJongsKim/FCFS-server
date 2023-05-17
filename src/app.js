require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 8000;
var http = require('http');
var router = express.Router();


// AWS 서버 MySQL 접속 정보
// const connection = mysql.createConnection({
//   host: process.env.RDS_HOST,
//   user: process.env.RDS_USER,
//   password: process.env.RDS_PASSWORD
// });

// AWS 서버 MySQL 접속, 접속 성공 여부
// connection.connect(function (err) {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }
//   console.log("Connected to database.");
// });

// AWS 서버 실행
// app.listen(PORT, () => console.log("Test app listening on port 8000!"));

// 웹 페이지 출력
app.get("/", (req, res) => res.send("Hello! Internet Programming 2Team"));





// 나중에 AWS 서버 연결 성공하면 여기서부터

// 웹서버 주소  : http://127.0.01:8000
http.createServer(app).listen(PORT,function(){
  console.log('Server Running at http://127.0.01:8000 !!!!!!! ');
});

// 일단 개인 MySQL DB로 진행 후에 MySQL.js 코드 수정

//router 실행
app.use(router);
const User = require("C:/Users/M2CL/FCFS-server/src/users/userController.js");
app.get("/user", User.findAll);

// 여기까지 삭제하고 나머지 코드 주석 풀기
