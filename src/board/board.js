const sql = require("../sql");

/*
 1. id (글 생성순서)
 2. 카테고리 Category  
 3. 모집할 인원수 HeadCount
 4. 제목 Title
 5. 내용 Content
 6. 작성한 사람 userId

 + 7. 참여한 인원수 CurrentCount
 */

const Board = function (board) {
  (this.boardId = board.boardId),
    (this.Category = board.Category),
    (this.HeadCount = board.HeadCount),
    (this.Title = board.Title),
    (this.Content = board.Content),
    (this.userId = board.userId),
    (this.CurrentCount = board.CurrentCount);
  this.CountUser = board.CountUser;
};

// 게시글 목록 조회(get)
// 카테고리, 제목, 내용, 현재인원, 모집인원, 게시글 순서(id), 유저확인(userId
Board.getAll = (result) => {
  sql.query(
    "SELECT Category, Title, Content, CurrentCount, HeadCount, boardId, userId, CountUser from board",
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      JSON.stringify(res);
      console.log("Board : ", res);
      result(null, res);
    }
  );
};

// 게시글 한개 조회(get)
Board.getDetail = (boardId, result) => {
  //,Title,Content,HeadCount,CurrentCount
  sql.query(
    "Select Category, Title, Content, HeadCount, CurrentCount from board where boardId=?",
    boardId,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      console.log("Board : ", res);
      result(null, res);
    }
  );
};

// 게시글 작성
Board.insert = (newPost, result) => {
  sql.query(
    "INSERT INTO board (Category, HeadCount, Title, Content, userId, CurrentCount) VALUES (?, ?, ?, ?, ?, ?)",
    [
      newPost.Category,
      newPost.HeadCount,
      newPost.Title,
      newPost.Content,
      newPost.userId,
      newPost.CurrentCount,
    ],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        return result(err, null);
      }
      console.log("Created user : ", { ...newPost });
      return result(null, { ...newPost });
    }
  );
};

//게시글 수정(put)
Board.updateById = (boardId, Board, result) => {
  sql.query(
    "Update board SET Category = ?,HeadCount = ?, Title = ? , Content = ?,userId = ? WHERE boardId = ?",
    [
      Board.Category,
      Board.HeadCount,
      Board.Title,
      Board.Content,
      Board.userId,
      boardId,
    ],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated board: ", { boardId: boardId, ...Board });
      result(null, { boardId: boardId, ...Board });
    }
  );
};

//인원수 추가
Board.updateCount = (CurrentCount, CountUser, boardId, result) => {
  sql.query(
    "UPDATE board SET CurrentCount = ?, CountUser = CONCAT(CountUser, ?, ',') WHERE boardId = ?",
    [CurrentCount + 1, CountUser, boardId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        console.log("Board not found");
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated CountUser for boardId: ", boardId);
      result(null, { boardId: boardId });
    }
  );
};

// 글삭제(delete)
Board.remove = (boardId, result) => {
  sql.query("DELETE FROM board WHERE boardId = ? ", boardId, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }
    //없는ID인경우
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Board;
