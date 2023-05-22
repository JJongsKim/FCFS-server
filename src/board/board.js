const express = require("express");
const router = express.Router();
const boardController = require("/Users/yuyongbin/Desktop/FCFS-server/src/board/boardcontroller.js");

//list
router.get("/", boardController.getList);

//New Post From
router.get("/new", postsController.getPostFrom);

//New Post Process
router.post("/new", postsControllwr.insertProcess);

//View Post
router.get("/:id", postsController.getView);

//Edit Post From -글쓰기 폼을 공유해서 사용
router.get("/:id/edit", postsController.getEditFrom);

//Edit Post Process
router.put("/:id", postsController.updateProcess);

//Delete Post Process
router.delete("/:id", postsController.deleteProcess);

module.exports = router;