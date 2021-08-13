const express = require('express');
const port = process.env.PORT || 3000;
const models = require('./models.json');

let app = express();

app.use(express.static('public'))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send(JSON.stringify({ models: '/models' }));
});

app.get('/models', function (req, res) {
  res.status(200).json(models);
});

app.listen(port, function () {
  console.log(`the server is available on http://localhost:${port}/\n`);
});
