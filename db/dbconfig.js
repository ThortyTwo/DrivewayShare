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
      user.string("email", 50).unique();
      user.string("phone_number", 15);
      user.string("username", 30).unique();
      user.string("password", 255);
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
      listing.integer("user_id").unsigned();
      listing.string("street_address", 50);
      listing.string("city_name", 50);
      listing.string("state", 20);
      listing.integer("zipcode");
      listing.float("latitude", 10, 6);
      listing.float("longitude", 10, 6);
      listing.integer("price");
      listing.boolean("available").defaultTo(true);
      listing.string("description", 255);
      listing.timestamps();
      listing.foreign("user_id").references("id").inTable("users");
    }).then(function(table) {
      console.log('listings table created', table);
    });
  }
});

//Unutilitzed 'Days' table to potentially allow for searching by day/time availability
db.knex.schema.hasTable("listing_days").then(function(exists) {
  if (!exists) {
    knex.schema.createTable("listing_days", function(listing_day) {
      listing_day.increments("id").primary();
      listing_day.integer("listing_id").unsigned();
      listing_day.string("day", 10);
      listing_day.integer("start_time");
      listing_day.integer("end_time");
      listing_day.foreign("listing_id").references("id").inTable("listings");
    }).then(function(table) {
      console.log('listings table created', table);
    });
  }
});

module.exports.bookshelf = bookshelf;
