var express = require("express");
var db = require("../db/dbconfig.js");
var Users = require("../db/collections/Users.js");
var User = require("../db/models/User.js");
var Listings = require("../db/collections/Listings.js");
var Listing = require("../db/models/Listing.js");
var _ = require("lodash");

var app = express();

app.use(express.static(__dirname + "/../client/"));

// route for getting search results
app.post("/api/search", function (req, res) {
	new Listing.Listing().fetchAll().then(function(listings) {
		var city = req.body.search;
		var filtered = _.filter(listings.models, function(listing) {
			if(listing.get("city_name") === city) {
				return listing;
			}
		});
		res.send(200, filtered);
	}).catch(function (error) {
		res.send(400, error);
	});
});

// route for everything else
app.get("/*", function (req, res) {
  res.send("404 NOT FOUND");
});


module.exports = app;
