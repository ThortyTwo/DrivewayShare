var bookshelf = require("../dbconfig.js").bookshelf;

var Listing = bookshelf.Model.extend({

  tableName: "listings",

  user: function() {
    return this.belongsTo(User);
  },

  days: function() {
    return this.hasMany(Day);
  }
});

module.exports = {
  Listing: Listing
};
