const postsModel = require("C:/Users/ADMIN/Documents/GitHub/FCFS-server/src/board/boardmodel.js");
const MarkdownIt = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});

//리스트
exports.getList = (req, res) => {
  postsModel.getList((result) => {
    if (result) {
      //console.log(result);

      res.render("board/list", {
        title: "선착순",
        posts: result,
      });
    } else {
      res.redirect("/");
    }
  });
};

//글 작성-폼
exports.getboardFrom = (req, res) => {
  res.render("/board/writeFrom", {
    title: "업로드하기",
  });
};

//글 작성-프로세스
exports.insertProcess = (req, res) => {
  let item = {
    Category: req.body.Category,
    HeadCount: req.body.HeadCount,
    Title: req.body.Title,
    Content: req.body.Content,
    password: req.body.password,
  };

  postsModel.insertData(item, (result) => {
    if (result) {
      if (result.affectedRows === 1) {
        res.redirect("/board");
      } else {
        res.redirect("/board/new");
      }
    }
  });
};

//글읽기
exports.getView = (req, res) => {
  let id = req.params.id;

  postsModel.getView(id, (result) => {
    if (result) {
      result.content = MarkdownIt.render(result.content);

      res.render("board/view", {
        title: result.subject,
        post: result,
      });
    }
  });
};

//글 수정-폼
exports.getEditForm = (req, res) => {
  let id = req.params.id;

  postsModel.getEdit(id, (result) => {
    if (result) {
      //console.log(result);

      res.render("board/writeForm", {
        title: result.subject,
        mode: "edit",
        post: result,
      });
    }
  });
};

//글 수정 프로세스
// exports.updateProcess =
//   (req,
//   (res) => {
//     let id = req.params.id;

//     let item = {
//       id: id,
//       Category: req.body.Category,
//       headcount: req.body.headcount,
//       title: req.body.title,
//       Content: req.body.Content,
//       Nickname: req.body.NickName,
//       Password: req.body.password,
//     };

//     postsModel.updateData(item, (result) => {
//       if (result) {
//         if (result.affectedRows === 1) {
//           res.redirect("/board/" + id);
//         } else {
//           res.redirect("/board/" + id + "/edit");
//         }
//       } else {
//         res.send('<script>alert("수정 실패");history.back();</script>');
//       }
//     });
//   });

//글 삭제 프로세스
exports.deleteProcess = (req, res) => {
  let item = {
    id: req.params.id,
    password: req.body.password,
  };

  postsModel.deleteData(item, (result) => {
    if (result) {
      if (result.affectedROws === 1) {
        res.redirect("/board/");
      } else {
        res.redirect("/board/" + item.id);
      }
    } else {
      res.send('<script> alert("삭제 실패");history.back();</script>');
    }
  });
};