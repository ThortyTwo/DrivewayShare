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

	var city = req.body.city;
	
	new User.User().fetchAll({withRelated: ['listings']}).then(function(users) {

		var retVal = [];

		for(var i=0; i<users.models.length; i++) {
			var user = users.models[i];
			var userListings = user.relations.listings.models;
			for(var j=0; j<userListings.length; j++) {
				if(userListings[j].get("city_name") === city) {
					retVal.push({
						listing: userListings[j],
						username: user.get("username"),
						email: user.get("email"),
						expand: false
					});
				}
			}
		}

		res.status(200);
		res.send(retVal);
		
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
