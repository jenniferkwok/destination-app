var mongoose = require("mongoose");
var Quote = require("./newquote");
var User = require("./user");
mongoose.connect("mongodb://localhost/project-1");

module.exports.Quote = Quote;
module.exports.User = User;