var express = require('express');
var db = require("../db/dbconfig.js");
var Users = require("../db/collections/Users.js");
var User = require("../db/models/User.js");
var Listings = require("../db/collections/Listings.js");
var Listing = require("../db/models/Listing.js");

var app = express();

app.use(express.static(__dirname + '/../client/'));

// route for getting search results
app.get('/api/search', function (req, res) {
	console.dir(req);
  res.send('GET request for search');
});

// route for everything else
app.get('/*', function (req, res) {
  res.send('404 NOT FOUND');
});

module.exports = app;
