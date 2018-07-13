const express = require('express');
const app = express();
const compression = require('compression');
const mockAPI = require(`${__dirname}/mock-api.json`);
let cart = require(`${__dirname}/cart.json`);
const bodyParser = require('body-parser');


app.use(compression());
app.use(express.static(__dirname + '/public'));


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
app.use(bodyParser.json());


app.get('/cart/api', (req, res) => {
    console.log("GET REQUEST");
    res.json(cart)
})
app.put('/cart/api', (req, res) => {
    console.log("PUT REQUEST", req.body);
    let newSku = req.body.lines[0].sku;

    // cart = req.body;
    let blah = mockAPI.articles.filter(el => {
        return el.sku === newSku
    })
    console.log("Blah", blah);
})

app.get('/catalog/api', (req, res) => {
    res.sendFile(`${__dirname}/mock-api.json`);
})

app.get('/article/api/:sku', (req, res) => {
    let article = mockAPI.articles.filter(el => {
        return el.sku === req.params.sku;
    })
    res.json(article[0]);
})

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
