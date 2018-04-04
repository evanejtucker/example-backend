require('../models/users');

module.exports = (app, passport)=> {
    app.get('/api/users', (req, res, next)=> {
        res.end('get request sent: /api/users');
    });
    app.get('/api/users/:user', (req, res, next)=> {
        console.log(req.params.user);
        res.end('get request sent: /api/user/:user');
    });
    app.post('api/user/login', passport.authenticate('local-login', {
        successRedirect : '/success', 
        failureRedirect : '/failure',
        failureFlash : true
    }));
    app.post('/api/user/signup', passport.authenticate('local-signup', {
        successRedirect : '/sucess', 
        failureRedirect : '/failure', 
        failureFlash : true 
    }));
}