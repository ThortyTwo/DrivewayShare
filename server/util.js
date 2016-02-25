var jwt = require("jwt-simple");


module.exports = {
	days: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],

	getCurrentUserID: function(token) {
		var currentUser = jwt.decode(token, "secret");
		return currentUser.id;
	}
}