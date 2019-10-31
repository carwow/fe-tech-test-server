const express = require('express');
const port = process.env.PORT || 3000;
const models = require('./models.json');
const simpleModels = JSON.parse(JSON.stringify(models));

simpleModels.forEach(model => {
  delete model.available_colors;
  delete model.recommended_engine;
});

let app = express();

app.use(express.static('public'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});

app.get('/models', function (req, res) {
  res.status(200).json(simpleModels);
});

app.get('/model/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!Number.isNaN(id)) {
    const task = models.find(item => {
      return (item.id === id);
    });

    if (task !== null) {
      res.status(200).json(task);
    } else {
      return res.status(404).json({
        message: 'Not found.',
      });
    }
  } else {
    return res.status(400).json({
      message: 'Bad request.',
    });
  }
});

app.listen(port, function () {
 console.log(`the server is available on http://localhost:${port}/\n`);
});
