const User = require('../models/users');

module.exports = {
    findAll: (req, res)=> {
        const userList = [];
        User.find((err, users)=>{
            if (err) {console.log(err)}
            for(var i=0; i<users.length; i++) {
                let user = {
                    'firstname': users[i].firstname,
                    'lastname': users[i].lastname,
                    'email': users[i].email,
                }
                userList.push(user);
                console.log(user);
            }
            req.param.userList = userList;
            res.send(userList)
        });
    },

    findOne: (req, res)=> {
        const value = true;
        return value;
    }
}