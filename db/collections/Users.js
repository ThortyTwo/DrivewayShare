var bookshelf = require("../dbconfig.js").bookshelf;
var User = require("../models/User.js");

var Users = new bookshelf.Collection();

Users.model: User;

module.exports = Users;
