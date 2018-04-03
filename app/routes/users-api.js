module.exports = (app)=> {
    app.get('/api/users', (req, res, next)=> {
        res.end('get request sent: /api/users');
    });
    app.get('/api/users/:user', (req, res, next)=> {
        console.log(req.params.user);
        res.end('get request sent: /api/user/:user');
    });
    app.post('/api/users', (req, res, next)=> {
        console.log(req.body);
        res.end('get request sent: /api/users');
    });
}