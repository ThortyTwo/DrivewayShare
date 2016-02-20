var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../client/'));

// route for getting search results
app.get('/api/search', function (req, res) {
  res.send('GET request for search');
});

// route for everything else 
app.get('/*', function (req, res) {
  res.send('404 NOT FOUND');
});

module.exports = app;