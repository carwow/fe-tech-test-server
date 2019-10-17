const express = require('express');
const port = process.env.PORT || 3000;
const modelsContainer = require('./models.json');

let app = express();

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});

app.get('/models', function (req, res) {
  res.send(modelsContainer);
});

app.listen(port, function () {
 console.log(`the server is available on http://localhost:${port}/\n`);
});
