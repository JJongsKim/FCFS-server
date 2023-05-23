const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : "127.0.0.1",
    user     : "root",
    password : process.env.RDS_PASSWORD,
    database : "internetprogramming"
  });

  connection.connect(error=>{
      if(error) throw error;
      console.log('Successfully connected to the DB.');
    })

// export
module.exports = connection;