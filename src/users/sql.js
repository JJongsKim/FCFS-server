// const mysql = require("mysql");

// // var connection = mysql.createConnection({
// //   host: "127.0.0.1",
// //   user: "root",
// //   password: process.env.RDS_PASSWORD,
// //   database: "internetprogramming",
// // });

// var connection = mysql.createConnection({
//   host: process.env.RDS_HOST,
//   user: process.env.RDS_USER,
//   password: process.env.RDS_PASSWORD,
// });

// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the DB.");
// });

// // export
// module.exports = connection;
