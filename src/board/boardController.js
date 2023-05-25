const Board = require("./board");

// 게시글 작성(Post)
exports.insert = (req, res) => {
  const result = req.body;

  //json으로 가져온 값 user객체에 넣기
  const board = new Board({
    // boardId: result.boardId,
    Category: result.Category,
    HeadCount: result.HeadCount,
    Title: result.Title,
    Content: result.Content,
    userId: result.userId,
    CurrentCount: result.CurrentCount,
    // post_date: result.post_date,
  });

  Board.insert(board, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "실 패" });
    }
    return res.status(200).json({ message: "성 공" });
  });
};

//게시글 수정
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "내용이 비어있으면 안됩니다!",
    });
  }

  Board.updateById(req.params.boardId, new Board(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "게시글을 찾을 수 없습니다.",
        });
      } else {
        res.status(200).send({
          message: "업데이트가 완료되었습니다" + req.params.boardId,
        });
      }
    } else res.send(data);
  });
};

//인원수 체크
exports.updateCount = (req, res) => {
  const CurrentCount = req.body.CurrentCount;

  Board.updateCount(CurrentCount, req.params.boardId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "게시글을 찾을 수 없습니다" + req.params.boardId,
        });
      } else {
        res.status(200).send({
          message: "업데이트가 완료되었습니다" + req.params.boardId,
        });
      }
    } else res.send(data);
  });
};

// 게시글 목록 조회
exports.getAll = (req, res) => {
  Board.getAll(function (err, data) {
    if (err) res.status(500).json({ message: " 조회 실패 " });
    else res.send(data);
  });
};

// 게시글 한개 조회(get)
exports.getDetail = (req, res) => {
  const boardId = req.body.boardId;

  Board.getDetail(boardId, (err, data) => {
    if (err) res.status(500).json({ message: " 조회 실패 " });
    else res.send(data);
  });
};

//게시글 삭제
exports.delete = (req, res) => {
  Board.remove(req.params.boardId, (err, data) => {
    //삭제 실패
    if (err) {
      //게시글이 없는 경우
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "없는 게시글입니다.boardId:" + req.params.boardId,
        });
      }
      //서버 오류
      else {
        res.status(500).send({
          message: "error!! boardId:" + req.params.boardId,
        });
      }
    }
    //삭제 성공
    else res.send({ message: "게시글 삭제" });
  });
};
