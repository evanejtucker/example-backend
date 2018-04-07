const User = require('../models/users');

module.exports = {
    findAll: (req, res)=> {
        User.find((err, users)=>{
            let userList = [];
            if (err) {console.log(err)}
            for(var i=0; i<users.length; i++) {
                userList.push(users[i]);
            }
            res.send(userList);
        });
    },

    findOne: (req, res)=> {
        User.findOne({username: req.params.user}, (err, user)=> {
            let text = '';
            if (user == null) {
                res.send("that user doesn't exist");
                // text = 'something went wrong';
                // return text;
            } else {
                res.send(user);
                // text = 'something went right';
                // return text;
            }
        });
    },

    removeOne: (req, res)=> {
        User.findOne({username: req.params.user}, (err, user)=> {
            if (user === null) {
               res.send('that user doesnt exist');
            } else {
                User.deleteOne({username: req.params.user}, (err, deleteUser)=> {
                    return console.log(user.username + ' was deleted successfully');
                });
            }
        });
    }
}