var apiCallers = require('../controller/apiCallers.js');
var pizzaOrderApi = require('../controller/pizzaOrderApi.js');

console.log("in routes.js");

module.exports = function (app) {
	// app.get
	// app.post etc...

	// TODO - Refresh Counter Function: 
	// Make a url that accepts a counter reset request for one and all api counter/s. 

	app.post('/createResetCounter', function (req, res) {
		apiCallers.create(req, res, req.body);
	})

	app.get('/resetAllCounters', function (req, res) {
		// stuff...
	})

	app.get('/resetCounter/:counterId', function (req, res) {
		// stuff...
	})

	app.get('/getRefreshCounter', function (req, res) {
		console.log("# # # Call received at /getRefreshCounter ...Checking for Refresh Counter entry in db... # # #");
		// (function apiCallerContents() {
			var checkCounter = apiCallers.readAll(req, res);
		// 	return checkCounter;
		// })()
		// .then(function(e) {
		// 	console.log("inside promise...", e);
		// }); 

		
		// res.json({
			
		// });
	})
}