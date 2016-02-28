var express = require("express");
var bodyParser = require('body-parser');
var db = require("../db/dbconfig.js");
var Users = require("../db/collections/Users.js");
var User = require("../db/models/User.js");
var Listings = require("../db/collections/Listings.js");
var Listing = require("../db/models/Listing.js");
var Days = require("../db/collections/Days.js");
var Day = require("../db/models/Day.js");
var util = require("./util.js");
var _ = require("lodash");
var jwt = require("jwt-simple");
var bcrypt = require("bcrypt-nodejs");

var app = express();

app.use(express.static(__dirname + "/../client/"));
app.use(bodyParser.json());

// route for getting search results
app.post("/api/search", function (req, res) {

	var targetLat = req.body.lat;
	var targetLng = req.body.lng;

	new User().fetchAll({withRelated: ['listings']}).then(function(users) {

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

				if(distmi < req.body.maxDist) {
					retVal.push({
						listing: currentListing,
						username: user.get("username"),
						email: user.get("email"),
						phone: user.get("phone_number"),
						expand: false,
						dist: distmi.toFixed(2)
					});
				}
			}
		}

		res.status(200).send(retVal);

	}).catch(function(error) {
		console.log(error);
		res.status(400).send(error);
	});

});

// route for posting a listing
app.post("/api/create", function(req, res) {

  var data = req.body;
	console.log(data);
	var id = util.getCurrentUserID(req.body.token);

	console.log(data.description);
	var newListing = new Listing({
		user_id: id,
		street_address: data.street,
		city_name: data.city,
		state: data.state,
		zipcode: data.zip,
		latitude: data.lat,
		longitude: data.lng,
		price: data.price,
		description: data.description
	});

	newListing.save().then(function(listing) {
		res.status(201).send("successfully created");
	}).catch(function (error) {
		console.log(error);
		res.status(400).send(error);
	});

});

//route for deleting a previously created listing
app.post("/api/delete", function(req, res) {

	var listingId = req.body.listingId;

	new Listing().where("id", listingId).destroy()
	  .catch(function (error) {
			res.status(400).send(error);
		})
});

//route for retrieving current user's listings
app.post("/api/userListing", function(req, res) {

	var id = util.getCurrentUserID(req.body.token);

	new Listing().where("user_id", id).fetchAll({withRelated: ["days"]})
		.then(function(data) {
		  res.status(200).send(data);
		})
		.catch(function(error) {
			res.status(400).send(error);
		})
	});

app.post("/api/toggle", function(req, res) {
	new Listing().where("id", req.body.listingId)
	  .save({available: req.body.avail}, {patch: true})
		.then(function(data) {
			res.status(200).send(data);
		})
		.catch(function (error) {
			res.status(400).send(error);
		})
})


// route for everything else
app.get("/*", function(req, res) {
  res.send("404 NOT FOUND");
});


// ************USER AUTHENTICATION****************

app.post("/api/users/signin", function (req, res, next) {

	var username = req.body.loginUsername;
	var password = req.body.loginPassword;

	new User({ username: username })
	    .fetch()
	    .then(function (user) {
	    	if(!user) {
	    		res.redirect("/home");
	    	} else {
	    		user.comparePassword(password, function (match) {
	    			if(match) {
	    				var token = jwt.encode(user, "secret");
	    				res.json({ token: token });
	    			} else {
	    				return next(new Error("User Not Found"));
	    			}
	    		});
	    	}
	    })
})

app.post("/api/users/signup", function (req, res, next) {

	var firstName = req.body.first_name,
	    lastName = req.body.last_name,
	    email = req.body.email,
	    phoneNumber = req.body.phone_number,
	    username = req.body.username,
	    password = req.body.password;

	new User({ username: username })
		.fetch()
		.then(function (user) {
			if(!user) {
				var newUser = new User({
					first_name: firstName,
					last_name: lastName,
					email: email,
					phone_number: phoneNumber,
					username: username,
					password: password
				});
				newUser.save()
					   .then(function (newUser) {
					   	   var token = jwt.encode(newUser, 'secret');
					   	   res.json({token: token});
					   });
			} else {
				return next(new Error("Username Already Exists"));
			}
		})

})

app.post("/user", function (req, res, next) {

	var token = req.headers['x-access-token'];
	if (!token) {
	  next(new Error('No token'));
	} else {
	  var user = jwt.decode(token, 'secret');
	  new User({ username: user.username })
	  	.fetch()
	    .then(function (foundUser) {
	      if (foundUser) {
	        res.status(200).send();
	      } else {
	        res.status(401).send();
	      }
	    })

	}
})


module.exports = app;
