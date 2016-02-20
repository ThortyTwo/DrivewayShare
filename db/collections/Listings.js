var bookshelf = require("../dbconfig.js").bookshelf;
var Listing = require("../models/Listing.js");

var Listings = new bookshelf.Collection();

Listings.model = Listing;

module.exports = Listings;
