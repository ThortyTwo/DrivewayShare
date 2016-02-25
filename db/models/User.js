var bookshelf = require("../dbconfig.js").bookshelf;
var Listing = require("./Listing.js").Listing
var bcrypt = require("bcrypt-nodejs");
var Promise = require("bluebird");


var User = bookshelf.Model.extend({
  
  tableName: "users",
  hasTimestamps: true,

  initialize: function () {
  	this.on("creating", this.hashPassword);
  },

  comparePassword: function (attemptedPassword, callback) {
  	
  	var savedPassword = this.get("password");
 
  	bcrypt.compare(attemptedPassword, savedPassword, function (err, isMatch) { 
  		if (err) {
  			throw(err);
  		} else {
  			callback(isMatch); 			
  		}
  	});
  },

  hashPassword: function () {
  	var cipher = Promise.promisify(bcrypt.hash);
  	return cipher(this.get("password"), null, null).bind(this)
  		   .then(function (hash) {
  		   	this.set("password", hash);
  		   });
  },

  listings: function() {
    return this.hasMany(Listing, "user_id");
  }

});

module.exports = User;
