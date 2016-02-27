var bookshelf = require("../dbconfig.js").bookshelf;
var Listing = require("./Listing.js");

var Day = bookshelf.Model.extend({

  tableName: "listing_days",
  hasTimestamps: true,

  listing: function() {
    return this.belongsTo(Listing, "listing_id");
  }
});

module.exports = Day;
