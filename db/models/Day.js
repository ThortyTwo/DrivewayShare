var bookshelf = require("../dbconfig.js").bookshelf;

var Day = bookshelf.Model.extend({

  tableName: "listing_days",

  listing: function() {
    return this.belongsTo(Listing);
  }
});

module.exports = {
  Day: Day
};
