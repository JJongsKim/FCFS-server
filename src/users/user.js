
const sql = require("C:/Users/M2CL/FCFS-server/src/users/sql.js");

const User = function(user){
    this.userID = user.userID;
    this.userName = user.userName;
    this.userPassword = user.userPassword;
};


User.getAll = result =>{
    sql.query('SELECT * FROM auth_table', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("customer: ", res);
        result(null, res);
    });
};

module.exports= User;
