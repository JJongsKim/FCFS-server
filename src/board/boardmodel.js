//mysql연결
//const mysqlConnObj = require('C:/Users/ADMIN/Documents/GitHub/FCFS-server/src/mysql.js');
//const mysqlConn = mysqlConnObj.connect();
const mysqlConn = require("C:/Users/ADMIN/Documents/GitHub/FCFS-server/src/mysql.js");

const bcrypt = require("bcrypt");
const saltRound = 10;

//게시글 리스트
exports.getList = (cb) => {
  let sql = "SELECT * FROM board ORDER BY id DESC LIMIT 10";
  mysqlConn.query(sql, (err, results, fields) => {
    if (err) {
      console.error("Error code:" + err.code);
      console.error("Error Message" + err.message);

      throw new Error(err);
    } else {
      cb(JSON.parse(JSON.stringify(results)));
    }
  });
};

//글보기
exports.getView = (id, cb) => {
  let sql =
    "SELECT ID,CATEGORY,HEADCOUNT,TITLE,CONTENT From board Where id=? LIMIT 1";
  mysqlConn.query(sql, [id], (err, results, fields) => {
    if (err) {
      console.error("Error code:" + err.code);
      console.error("Error Message:" + err.message);

      throw new Error(err);
    } else {
      cb(results[0]);
    }
  });
};

//새로운 글을 작성하면 데이터베이스에 입력
exports.insertData = (data, cb) => {
  bcrypt.genSalt(saltRound, (err, salt) => {
    if (err) throw new Error(err);

    bcrypt.hash(data.password, salt, (err, hash) => {
      if (err) throw new Error(err);

      //입력구문
      let now = new Date();
      let sql =
        "INSERT INTO board (Category,HeadCount,Title,Content,NickName,Password) VALUES (?,?,?,?,?,?)";
      let binParam = [
        data.Category,
        data.Headcount,
        data.Title,
        data.Content,
        data.NickName,
        hash,
        now,
      ];
      mysqlConn.query(sql, binParam, (err, results, fields) => {
        if (err) {
          console.error("Error code:" + err.code);
          console.error("Error Message:" + err.message);

          throw new Error(err);
        } else {
          cb(JSON.parse(JSON.stringify(results)));
        }
      });
    });
  });
};

//...whatever...
//글 수정 폼
exports.getdit = (id, cb) => {
  let sql =
    "Select id,category,Headcount,Title,Content From board Where id=? LIMIT 1";
  mysqlConn.query(sql, [id], (err, results, fields) => {
    if (err) {
      console.error("Error code:" + err.code);
      console.error("Error Message" + err.message);

      throw new Error(err);
    } else {
      cb(results[0]);
    }
  });
};

//글 수정 프로세스
exports.updateData = (data, cb) => {
  //해시된 비밀번호 찾아온다.
  let sql = "SELECT password FROM board WHERE id=? LIMIT1";
  mysqlConn.query(sql, [data.id], (err, results, fields) => {
    if (err) throw new Error(err);

    let hash_password = results[0].password;
    if (hash_password) {
      //비밀번호 존재시 비교
      bcrypt.compare(data.password, hash_password, (err, result) => {
        if (err) throw new Error(err);

        if (result) {
          let sql =
            "UPDATE board SET Category=?,Headcount=?,Title=?,Content=? Where id=?";
          let bindParam = [
            data.Category,
            data.Headcount,
            data.Title,
            data.Content,
            data.id,
          ];
          mysqlConn.query(sql, bindParam, (err, results, fields) => {
            if (err) throw new Error(err);

            cb(JSON.parse(JSON.stringify(results)));
          });
        } else {
          cb(false);
        }
      });
    } else {
      cb(false);
    }
  });
};

//글 삭제 프로세스
exports.deleteData = (data, cb) => {
  //해시된 비밀번호를 찾아온다.
  let sql = "SELECT password FROM board WHERE id=? LIMIT 1";
  mysqlConn.query(sql, [data.id], (err, results, fields) => {
    if (err) throw new Error(err);

    let hash_password = results[0].password;
    if (hash_password) {
      bcrypt.compare(data.password, hash_password, (err, result) => {
        if (err) throw new Error(err);

        if (result) {
          let sql = "Delete FROM board WHERE id=?";
          mysqlConn.query(sql, [data.id], (err, results, fields) => {
            if (err) throw new Error(err);

            cb(JSON.parse(JSON.stringify(results)));
          });
        } else {
          cb(false);
        }
      });
    } else {
      cb(false);
    }
  });
};