var mongoose = require('mongoose');
var apiCallers = mongoose.model('apiCaller');

console.log("apiCallers controller is online")

module.exports = (function (app) {
	return {
		//crud here
		create: function() {

		},

		readAll: function (req, res) {
			console.log("* * * * Attempting to read all from apiCallers controller * * * *");
			apiCallers.find({}, function (err, e) {
				console.log("Was anything found?");
				if (e) {
					console.log("! YES ! \n", e);
					e.length > 1 ? console.log("response value: ", e) : console.log("The box is empty");
					res.json({data: e});
				}
				else if (err) {
					console.log("ERROR: ", err);
				}
				else {
					var fourOhFour = "! ! ! There is nothing in the database ! ! !";
					console.log(fourOhFour);
					return fourOhFour;
				}
			})
		},

		readById: function() {

		},

		update: function() {

		},
		
		destroy: function() {

		},


	}
})();