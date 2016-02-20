var bookshelf = require("../dbconfig.js").bookshelf;

var Listing = bookshelf.Model.extend({
  tableName: "listings",
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = {
  Listing: Listing
};
