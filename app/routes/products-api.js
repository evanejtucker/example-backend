module.exports = (app)=> {
    app.get('/api/products', (req, res, next)=> {
        res.end('get request sent: /api/products');
    });
    app.get('/api/product/:product', (req, res, next)=> {
        console.log(req.params.product);
        res.end('get request sent: /api/product/:product');
    });
    app.post('/api/products', (req, res, next)=> {
        console.log(req.body);
        res.end('get request sent: /api/products');
    });
};