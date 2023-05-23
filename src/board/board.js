// const express = require("express");
// const router = express.Router();
// const boardController = require("/Users/ADMIN/Desktop/GitHub/FCFS-server/src/board/boardcontroller.js");
const sql = require("C:/Users/ADMIN/Documents/GitHub/FCFS-server/src/board/sql.js");


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




// 글작성
Board.insert = (newPost, result)=>{
    sql.query("INSERT INTO board SET ?", newPost, (err, res)=>{ if(err){
                console.log("error : ", err);
                return result(err, null);
            }
            console.log("Created user : ",{...newPost });
            return result(null, {...newPost});
        });
};

//글조회(get)
Board.getAll = result =>{
    sql.query("Select * from board",  (err, res)=>{ 
        if(err){
                console.log("error : ", err);
                result (err, null);
                return;
            }
            console.log("Board : ",res);
            result(null, res);
        });
};

// // 글수정(put)
// Board.update = (newPost, result)=>{
//     sql.query("INSERT INTO board SET ?", newPost, (err, res)=>{ if(err){
//                 console.log("error : ", err);
//                 return result(err, null);
//             }
//             console.log("Created user : ",{...newPost });
//             return result(null, {...newPost});
//         });
// };

// 글삭제(delete)--전체 삭제는 되는데 왜 where ID = ?하면 안될까?
Board.remove = (ID, result)=>{
    sql.query('DELETE FROM board WHERE ID = ? ' , ID, (err, res)=>{ 
        if(err){
                console.log("error : ", err);
                result(err, null);
                return;
            }
            //없는ID인경우
            if(res.affectedRows == 0){ 
                result({kind:"not_found"},null);
            return; 
            }
            result(null,res);
        });
};

module.exports= Board;