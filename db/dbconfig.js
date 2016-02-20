var path = require("path");

var knex = require("knex")({
  client: "mysql",
  connection: {
    host      : "mysqlcluster7.registeredsite.com",
    user      : "drivewayadmin",
    password  : "!Qaz2wsx3edc",
    database  : "driveway",
    charset   : "utf8"
  }
});

var bookshelf = require("bookshelf")(knex);
var db = bookshelf;

db.knex.schema.hasTable("users").then(function(exists) {
  if (!exists) {
    knex.schema.createTable("users", function(user) {
      user.increments("id").primary();
      user.string("first_name", 30);
      user.string("last_name", 30);
      user.string("e-mail", 50).unique();
      user.string("username", 30).unique();
      user.string("password", 50);
      user.timestamps();
    }).then(function(table) {
      console.log('users table created', table);
    });
  }
});

db.knex.schema.hasTable("listings").then(function(exists) {
  if (!exists) {
    knex.schema.createTable("listings", function(listing) {
      listing.increments("id").primary();
      listing.integer("user_id").unsigned().index().references("id").inTable("users");
      listing.string("street_address", 50);
      listing.string("city_name", 50);
      listing.integer("price");
      listing.integer("start_time");
      listing.integer("end_time");
      listing.string("avail_days", 10);
      listing.timestamps();
    }).then(function(table) {
      console.log('listings table created', table);
    });
  }
});

module.exports.bookshelf = bookshelf;
