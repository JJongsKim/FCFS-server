// const express = require("express");
// const router = express.Router();
// const boardController = require("/Users/ADMIN/Desktop/GitHub/FCFS-server/src/board/boardcontroller.js");
const sql = require("C:/branch/FCFS-server/src/board/sql.js");


/*
 1. id (글 생성순서)
 2. 카테고리 Category  
 3. 인원수 HeadCount
 4. 제목 Title
 5. 내용 Content
 6. 작성한 사람 닉네임 Nickname
 */


//새로운 틀에 맞춰서 다시 만들기
const Board = function(board){
    this.Category = board.Category,
    this.HeadCount= board.HeadCount,
    this.Title =board.Title,
    this.Content= board.Content,
    this.Nickname= board.Nickname
};




// 회원가입 
Board.insertProcess = (newPost, result)=>{
    sql.query("INSERT INTO board SET ?", newPost, (err, res)=>{ if(err){
                console.log("error : ", err);
                return result(err, null);
            }
            console.log("Created user : ",{...newPost });
            return result(null, {...newPost});
        });
};

module.exports= Board;