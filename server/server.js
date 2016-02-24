var express = require("express");
var bodyParser = require('body-parser');
var db = require("../db/dbconfig.js");
var Users = require("../db/collections/Users.js");
var User = require("../db/models/User.js");
var Listings = require("../db/collections/Listings.js");
var Listing = require("../db/models/Listing.js");
var util = require("./util.js");
var _ = require("lodash");

var app = express();

app.use(express.static(__dirname + "/../client/"));
app.use(bodyParser.json());

// route for getting search results
app.post("/api/search", function (req, res) {
	console.log(req.body);
	new Listing.Listing().fetchAll().then(function(listings) {
		var city = req.body.search;
		var filtered = _.filter(listings.models, function(listing) {
			if(listing.get("city_name") === city) {
				return listing;
			}
		});
		res.status(200);
		res.send(filtered);
	}).catch(function (error) {
		console.log(error);
		res.status(400);
		res.send(error);
	});

});

// route for posting a listing
app.post("/api/create", function (req, res) {

	var data = req.body.listingInfo;


	new Listing.Listing().fetchAll().then(function(listings) { // CHANGE THIS LINE
		res.status(201);
		res.send("successfully created (but not actually)");
	}).catch(function (error) {
		console.log(error);
		res.status(400);
		res.send(error);
	});

});

// route for everything else
app.get("/*", function (req, res) {
  res.send("404 NOT FOUND");
});


module.exports = app;
