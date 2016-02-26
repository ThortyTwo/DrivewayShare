var jwt = require("jwt-simple");
var db = require("../db/dbconfig.js");
var Users = require("../db/collections/Users.js");
var User = require("../db/models/User.js");
var Listings = require("../db/collections/Listings.js");
var Listing = require("../db/models/Listing.js");
var Days = require("../db/collections/Days.js");
var Day = require("../db/models/Day.js");
var _ = require("lodash");

module.exports = {

	getCurrentUserID: function(token) {
		var currentUser = jwt.decode(token, "secret");
		return currentUser.id;
	},

	formatUserData: function(userData, callback) {
		var result = [];
		var temp = {};

		_.forEach(userData, function(entry) {
			temp = entry;
			var dayList = entry.days;
			_.forEach(dayList, function(day) {
				temp[day.day] = [day.day, day.start_time, day.end_time];
			})
			result.push(temp);
		})
		callback(result);
	}
}
