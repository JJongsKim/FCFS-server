const express = require("express");
const router = express.Router();
const boardController = require("/Users/yuyongbin/Desktop/FCFS-server/src/board/boardcontroller.js");

//list
router.get("/", boardcontroller.getList);

//New Post From
router.get("/new", boardController.getPostFrom);

//New Post Process
router.post("/new", boardControllwr.insertProcess);

//View Post
router.get("/:title", boardController.getView);

//Edit Post From -글쓰기 폼을 공유해서 사용
router.get("/:title/edit", boardController.getEditFrom);

//Edit Post Process
router.put("/:id", boardController.updateProcess);

//Delete Post Process
router.delete("/:id", boardController.deleteProcess);

module.exports = router;