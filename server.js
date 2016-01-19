var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var Pen = require('./models/Pen');

app.set('views', './views'); // ./views/index.html => index.html
app.engine('html', require('ejs').renderFile);
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.set('view engine', 'html'); //index.html => index
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET localhost:3000/
app.get('/', function(req, res) {
  res.render('index');
});

// GET /api/v1/pens
app.get('/api/v1/pens', function(req, res) {
  res.send(Pen.collection);
});

// GET /api/v1/pens/:id
app.get('/api/v1/pens/:id', function(req, res) {
  Pen.findPen(req.params.id, function(err, result) {
    if(err) return res.status(400).send(err);
    res.send(result);
  });
});

// POST /api/v1/pens
app.post('/api/v1/pens', function(req, res) {
  Pen.create(req.body, function(err, result) {
    if(err) return res.status(400).send(err);
    res.send(result);
  });
});

// PUT /api/v1/pens/:id
app.put('/api/v1/pens/:id', function(req, res) {
  Pen.update(req.body, function(err, result) {
      if(err) return res.status(400).send(err);
      res.send(result);
    });
});

// DELETE /api/v1/pens/:id
app.delete('/api/v1/pens/:id', function(req, res) {
  Pen.remove(req.params.id, function(err, result) {
    if(err) return res.status(400).send(err);
    res.send(result);
  });
});

// GET anything that does not exist above
// LEAVE THIS AT THE BOTTOM!!!!!!
app.use('/', function(req, res) {
  res.render('404');
});

app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000/');
});
