var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
	name: String, 
})

mongoose.model('User', friendSchema)