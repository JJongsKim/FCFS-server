const User = require("./user");

// token
const jwt = require("jsonwebtoken");

// 회원가입
exports.create = (req, res) => {
  const result = req.body;
  const pwdcheck = result.pwdCheck;
  const userid = result.userPassword == pwdcheck ? result.userId : null;

  console.log(userid);
  //json으로 가져온 값 user객체에 넣기
  const user = new User({
    userId: userid,
    userName: result.userName,
    userPassword: result.userPassword,
  });

  User.create(user, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "회원 가입 실패" });
    }
    return res.status(200).json({ message: "회원 가입 성공" });
  });
};

// 로그인
exports.signin = (req, res) => {
  const result = req.body;

  //json으로 가져온 값 user객체에 넣기
  const user = new User({
    userId: result.userId,
    userPassword: result.userPassword,
  });

  // DB에서 해당 user가 있는지 찾기
  User.signin(user.userId, user.userPassword, (err, data) => {
    // 아이디가 없는 경우
    if (data == "no") {
      res.status(404).send({
        message: "존재하지 않는 계정입니다. userId :" + user.userId,
      });
    }

    // 서버 오류
    else if (err) {
      res.status(500).send({
        message: "로그인 실패 userId :" + user.userId,
      });
    }

    // 로그인 성공
    else {
      //1시간 동안 유효한 토큰 발급
      const token = jwt.sign({ userId: user.userId }, process.env.KEY, {
        expiresIn: "1h",
      });
      res.send({
        message: "로그인 성공",
        AccessToken: token,
        userId: user.userId,
      });
    }
  });
};

// 계정 탈퇴
exports.delete = (req, res) => {
  User.remove(req.params.userID, (err, data) => {
    // 탈퇴 실패
    if (err) {
      // 아이디가 없는 경우
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "없는 계정입니다. userID :" + req.params.userID,
        });
      }

      // 서버 오류
      else {
        res.status(500).send({
          message: "error !!  userID :" + req.params.userID,
        });
      }
    }

    // 탈퇴 성공
    else res.send({ message: "계정 탈퇴" });
  });
};
