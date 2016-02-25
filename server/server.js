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

	var targetLat = req.body.lat;
	var targetLng = req.body.lng;
	
	new User.User().fetchAll({withRelated: ['listings']}).then(function(users) {

		var retVal = [];

		for(var i=0; i<users.models.length; i++) {
			var user = users.models[i];
			var userListings = user.relations.listings.models;
			for(var j=0; j<userListings.length; j++) {
				var currentListing = userListings[j];
				var lat = currentListing.get("latitude");
				var lng = currentListing.get("longitude");

				// convert lat/lng to km, then to distance in miles
				var latDiff = Math.abs(lat - targetLat);
				var lngDiff = Math.abs(lng - targetLng);
				var latkm = latDiff * 110.574;
				var lngkm = lngDiff * 111.320 * Math.cos(latDiff);
				var distkm = Math.sqrt(Math.pow(latkm,2)+Math.pow(lngkm,2));
				var distmi = distkm * .621371;

				if(distmi < 2) {
					retVal.push({
						listing: currentListing,
						username: user.get("username"),
						email: user.get("email"),
						expand: false,
						dist: distmi.toFixed(2)
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

	var data = req.body;

	var newListing = new Listing.Listing({
		user_id: data.current_username,
		street_address: data.street,
		city_name: data.city,
		state: data.state,
		zipcode: data.zip,
		latitude: data.lat,
		longitude: data.lng,
		price: data.price
	});

	console.log("create", newListing);




	newListing.save().then(function(listing) {
		res.status(201);
		res.send("successfully created");
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
