

const Board = require("C:/branch/FCFS-server/src/board/board.js");

// token
const jwt = require("jsonwebtoken");


// 게시글 작성
exports.insert = (req,res)=>{
    const result = req.body;
  
    //json으로 가져온 값 user객체에 넣기   
    const  board = new Board({
      Category: result.Category,
      HeadCount: result.HeadCount,
      Title: result.Title,
      Content: result.Content,
      Nickname: result.Nickname
    });
    
    Board.insert( board,(err, data) =>{
          if(err){
              return res.status(500).json({ message: " 실 패 "});
          } return res.status(200).json({ message: " 성 공"});
      })
  };
  
  // 게시글 조회
exports.get = (req,res)=>{
    const result = req.body;
  
    //json으로 가져온 값 user객체에 넣기   
    const  board = new Board({
      Category: result.Category,
      HeadCount: result.HeadCount,
      Title: result.Title,
      Content: result.Content,
      Nickname: result.Nickname
    });
    
    Board.get( board,(err, data) =>{
          if(err){
              return res.status(500).json({ message: " 실 패 "});
          } return res.status(200).json({ message: " 성 공"});
      })
  };