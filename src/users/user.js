
const sql = require("C:/Users/M2CL/FCFS-server/src/users/sql.js");

// token
const jwt = require("jsonwebtoken");



const User = function(user){
    this.userID = user.userID;
    this.userName = user.userName;
    this.userPassword = user.userPassword;
};

// 회원가입 
User.create = (newUser, result)=>{
    sql.query("INSERT INTO auth_table SET ?", newUser, (err, res)=>{
        if(err){
            console.log("error : ", err);
            return result(err, null);
        }
        console.log("Created user : ",{...newUser });
        return result(null, {...newUser});
    });
};

// 로그인
User.signin = (userID,userPassword ,result) =>{

    sql.query('SELECT userName FROM auth_table WHERE userID="'+ userID +'" AND userPassword ="'+ userPassword +'"', (err,res)=>{
        if(err){
            console.log("error : ",err);
            return result(err,null);
        }
        else if(res.length == 0){
            console.log("Login failed .... ");
            return result(err,'no');
        }
        else{
            console.log(res[0]);
            console.log("Login Successful !! Welcome ~~ ")

            //1시간 동안 유효한 토큰 발급
            const token = jwt.sign({ userID: userID } , process.env.KEY, {  expiresIn: "1h",});
            console.log(token);
    
            return result(null, res);
        }
    });



};



// 계정 삭제
User.remove = (userid, result)=>{
    sql.query('DELETE FROM auth_table WHERE userID = ?',userid, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // 없는 계정인 경우
        if(res.affectedRows ==0){
            result({kind: "not_found"}, null);
            return;
        }
        result(null, res);
    });
};



module.exports= User;
