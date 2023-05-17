const User = require("C:/Users/M2CL/FCFS-server/src/users/user.js");



exports.findAll = (req,res)=>{
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

