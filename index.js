const path = require('path');
const express = require('express');
const compression = require('compression');
const enforce = require('express-sslify');

const isProduction = process.env.NODE_ENV === 'production';

let app = express();

if (isProduction) {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.render('./src/index.html');
});

app.get('/collector', (req, res) => {
  res.render('./src/collector/index.html');
});

app.listen(port, function () {
  console.log('App is running on:' + port);
});
