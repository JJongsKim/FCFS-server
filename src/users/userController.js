const User = require("C:/Users/M2CL/FCFS-server/src/users/user.js");



// 회원가입
exports.create = (req,res)=>{
  const result = req.body;
  res.send(result);

  //json으로 가져온 값 user객체에 넣기
  const user = new User({
    userID: result.userID,
    userName: result.userName,
    userPassword: result.userPassword
  });

  // DB에 새로운 계정 저장
 User.create(user, (err, data) =>{
      if(err){
          res.status(500).send({
              message:
              err.message || "DB 저장에 실패하였습니다."
          });
      };
  })
};



// 로그인
exports.signin =(req, res) =>{
  const result = req.body;

  //json으로 가져온 값 user객체에 넣기
  const user = new User({
    userID: result.userID,
    userPassword: result.userPassword
  });

  // DB에서 해당 user가 있는지 찾기
  User.signin(user.userID, user.userPassword, (err,data)=>{

    // 아이디가 없는 경우
    if (data == 'no') {
      res.status(404).send({
        message: 'Login failed .... userID :'+ user.userID
      });
    } 

    // 서버 오류
    else if (err) {
      res.status(500).send({
        message: "Could not Login Account userID :" + user.userID
      });
    }

    // 로그인 성공
    else res.send({ message: 'Login Successful' });
   
  });
}





// 계정 탈퇴
exports.delete = (req,res)=>{
  User.remove(req.params.userID, (err, data) => {

    // 탈퇴 실패
    if (err) {
      // 아이디가 없는 경우
      if (err.kind === "not_found") {
        res.status(404).send({
          message: 'Not found User with userID :'+ req.params.userID
        });
      } 
      
      // 서버 오류
      else {
        res.status(500).send({
          message: "Could not delete Account userID :" + req.params.userID
        });
      }
    }

    // 탈퇴 성공
    else res.send({ message: `User Account was deleted successfully!` });
  });
};