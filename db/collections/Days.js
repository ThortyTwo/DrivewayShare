var bookshelf = require("../dbconfig.js").bookshelf;
var Day = require("../models/Day.js");

var Days = new bookshelf.Collection();

Days.model = Day;

module.exports = Days;
