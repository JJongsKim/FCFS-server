require("dotenv").config();
require;
const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 8000;
const path=require('path');
app.set('view engine','html');
app.set('views',path.join(__dirname,'board'));
var http = require("http");
var router = express.Router();

app.engine('html', require('ejs').renderFile);


// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "test_user",
//   password: process.env.RDS_PASSWORD,
//   database: "db_test",
//   port: process.env.DB_PORT,
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }
//whatever;
//const methodOverride = require("method-override");
//whatever;
//app.use(methodOverride("_method"));
//whatever;
//   console.log("Connected to database.");
// });

// connection.end();

// app.get("/", (req, res) => res.send("Hello! Internet Programming 2Team"));
// app.listen(PORT, () => console.log("Test app listening on port 8000!"));

http.createServer(app).listen(PORT, function () {
  console.log("Server Running at http://127.0.01:8000 !!!!!!! ");
});

app.use(router);
//const User = require("/Users/yuyongbin/Desktop/FCFS-server/src/users/userController.js");
//const { version } = require("punycode");
//app.get("/user", User.findAll);

const mysql_test = require("C:/Users/ADMIN/Documents/GitHub/FCFS-server/src/mysql.js");

const boardController = require("C:/Users/ADMIN/Documents/GitHub/FCFS-server/src/board/boardcontroller.js");
const { appendFileSync } = require("fs");
router.get("/",boardController.getList)

//app.use('/', router)
//app.all('*', function(req, res){
// res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
//})
//app.listen(app.get('port'), function(){
//console.log('서버가 시작되었습니다. 포트 : '+app.get('port'));
//connectDB();
//});
