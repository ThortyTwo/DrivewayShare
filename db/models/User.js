var bookshelf = require("../dbconfig.js").bookshelf;

var User = bookshelf.Model.extend({
  tableName: "users"
  listings: function() {
    return this.hasMany(Listing);
  }
});

module.exports = {
  User: User
};
