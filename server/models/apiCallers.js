var mongoose = require('mongoose');

var apiCallerSchema = new mongoose.Schema({
	name: { 
		type: String, 
		required: true,
		maxlength: 10
	},
	callCount: {
		type: Number,
		required: true,
	},
	callMax: {
		type: Number,
		required: false,
	},
})

mongoose.model('apiCaller', apiCallerSchema)