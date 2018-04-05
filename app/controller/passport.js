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
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    console.log('no user found');
                    return done(null, false);
                }
                if (user) {
                    console.log('user: ' + user);
                    if(user.validPassword(password, user.password)) {
                        return done(null, user);
                    } else {
                        console.log('invalid password');
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
            User.findOne({username: username}, function(err, user) {
                if (err) {
                    console.log('something went wrong');
                    return done(null, false);
                }
                if (user) {
                    console.log('that user already exists');
                    return done(null, false);
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
                    newUser.password = newUser.generateHash(info.password);
                    newUser.save((error)=> {
                        if (error) {
                            console.log(error);
                        }
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

    isLoggedIn = (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('user authenticated');
            next();
        } else{
            console.log("user not authenticated");
            res.redirect('/')
        }
    };

    logoutUser = (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('logged out successfully')
            req.logout();
            next();
        } else {
            next();
        }
    };
}