const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = (passport)=> {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

    passport.use('local-login', new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
        console.log(req.body);
        console.log('username: ' + username);
        console.log('password:' + password);
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    console.log('no user found');
                    return done(null, false);
                }
                if (user) {
                    if(user.validPassword(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
            });
        }
    ));

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            console.log('username: ' + username);
            console.log('password: ' + password);
            User.findOne({username: username}, function(err, user) {
                if (err) {
                    console.log('something went wrong');
                    return (done, null);
                }
                if (user) {
                    console.log(user);
                    console.log('that user already exists');
                    return (done, null);
                }
                else {
                    let info = req.body;
                    let newUser = new User({
                        firstname: info.firstname, 
                        lastname: info.lastname,
                        username: info.username,
                        password: info.password,
                        email: info.email,
                        admin: false
                    });
                    newUser.password = newUser.generateHash(info.confirmPassword);
                    console.log(newUser);
                    newUser.save((error)=> {
                        if (error) {
                            console.log(error);
                        }
                        return done (null, user);
                    });
                }
            });
        }
    ));
}