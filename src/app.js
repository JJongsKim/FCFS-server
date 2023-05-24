//.env값 읽는 모듈
require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 8000;
var http = require('http');
var router = express.Router();



// 웹 페이지 출력
app.get("/", (req, res) => res.send("Hello! Internet Programming 2Team"));





// 나중에 AWS 서버 연결 성공하면 삭제
http.createServer(app).listen(PORT,function(){
  console.log('Server Running at "http://127.0.01:8000" ');
});



//router 실행
app.use(router);
app.use(express.json());

const boardController = require("C:/branch/FCFS-server/src/board/boardcontroller.js");

app.post("/new", boardController.insert);
app.get("/title",boardController.getAll);
app.put("/:ID",boardController.update);
app.delete("/:ID",boardController.delete);