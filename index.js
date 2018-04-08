const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');

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


app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
});

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});
