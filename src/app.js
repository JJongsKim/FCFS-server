// .env값 읽는 모듈
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

const userController = require("./users/userController");
const boardController = require("./board/boardController");

var http = require("http");
var router = express.Router();

// 웹 페이지 출력
app.get("/", (req, res) => res.send("Hello! Internet Programming 2Team"));

http.createServer(app).listen(PORT, function () {
  console.log("Server Running at EC2 Server!!!");
});

//router 실행, cors 전체허용
app.use(cors());
app.use(router);
app.use(express.json());

// 회원가입
app.post("/user/sign_up", userController.create);

// 로그인
app.post("/user/sign_in", userController.signin);

// 탈퇴
app.delete("/user/:userID", userController.delete);

// 게시글 한개 조회(get)
app.get("/title/detail", boardController.getDetail);

//게시글 목록 조회(get)
app.get("/title", boardController.getAll);

// 게시글 작성(post)
app.post("/new", boardController.insert);

//게시글 수정(put)
app.put("/:boardId", boardController.update);

//인원수 추가
app.put("/count/:boardId", boardController.updateCount);

// 게시글 삭제
app.delete("/:boardId", boardController.delete);
