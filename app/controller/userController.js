const User = require('../models/users');

module.exports = {
    findAll: (req, res)=> {
        User.find((err, users)=>{
            let userList = [];
            if (err) {console.log(err)}
            for(var i=0; i<users.length; i++) {
                let user = {
                    'username': users[i].username,
                    'firstname': users[i].firstname,
                    'lastname': users[i].lastname,
                    'email': users[i].email,
                    'photo': users[i].photo,
                    'admin': users[i].admin
                }
                userList.push(user);
            }
            res.send(userList);
        });
    },

    findOne: (req, res)=> {
        const value = true;
        return value;
    }
}