var bookshelf = require("../dbconfig.js").bookshelf;
var Listing = require("./Listing.js").Listing

var User = bookshelf.Model.extend({

  tableName: "users",

  listings: function() {
    return this.hasMany(Listing, "user_id");
  }
});

module.exports = {
  User: User
};
