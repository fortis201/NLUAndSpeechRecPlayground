var mongoose = require('mongoose');
var fs = require("fs");

// connect to the database
mongoose.connect('mongodb://localhost/IBMWatsonPersonalityInsightsLocalDb');
// specify path to all models:
var models_path = __dirname + '/../models';
// read files in the models_path and for each one check if its a js file before requiring
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') > 0) {
		require(models_path+'/'+file);
	}
});