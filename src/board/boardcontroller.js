

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
  
  // 게시글 조회  흠.......?
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

  //게시글 수정
  exports.update = (req,res)=>{
    Board.put(req.params.ID,(err,data)=>{}
    )}

  //게시글 삭제
  exports.delete = (req,res)=>{
    Board.remove(req.params.ID,(err,data)=>{
    
      //삭제 실패
      if(err){
        //게시글이 없는 경우
        if(err.kind == "not_found"){
          res.status(404).send({
            message:'없는 게시글입니다.ID:'+req.params.ID
          });
        }
      //서버 오류
      else{
        res.status(500).send({
         message:"error!! ID :" + req.params.ID
  });
}
      }
      //삭제 성공
      else res.send({message:'게시글 삭제'});
    });
      };