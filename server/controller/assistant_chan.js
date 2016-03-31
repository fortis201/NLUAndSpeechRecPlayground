// ************************************
// Must be formatted as if it was on server.js
// ************************************

console.log("A-chan is alive!!!");

// ============================
// API AI
// ============================

var apiai = require('apiai');
var apiaiBUrl = "https://api.api.ai/v1/";

module.exports = function (app)	{


	var agentZero = apiai("2231bea759c4431bbb20931b23d72af4", "ee49bf5b-f7e5-4f5e-938d-3330fc31e7a7");
	var pizzaOrderAgent = apiai("07f265e6e3cf4d27acb0cb60374da632","ee49bf5b-f7e5-4f5e-938d-3330fc31e7a7");

	app.post('/ama', function (req, res) {
		console.log('reached AMA in the server with the following content:');
		console.log(req.body);
		var zeroRequest = agentZero.textRequest(req.body.userQuery);
	 
		zeroRequest.on('response', function(e) {
			console.log('response received from apiai:');
			if (e.result.source === 'domains') {
				console.log("Response source is from a Domain: \n", e);

				e.result.metadata.speech.length > 1 ? res.json({msg: e.result.metadata.html, result: e.result.metadata.speech}) : res.json({result: e.result.metadata})

				// res.json({result: e.result.metadata});
			}
			else {
				console.log("Response came from Agent: \n", e);
				res.json({result: e});
			}
		});
		 
		zeroRequest.on('error', function(error) {
		    console.log(error);
		});

		zeroRequest.end()		
	})

	app.post('/orderPizza', function (req, res) {
		console.log("You have reached the pizza ordering app with the following request:");
		console.log(req.body);

		var pizzaRequest = pizzaOrderAgent.textRequest(req.body.userQuery);

		pizzaRequest.on('response', function (e) {
			console.log('Order taker has responded:');
			console.log(e);

			if (e.result.source === 'agent') {
				console.log("% % % Agent responded % % %");
				e.result.fulfillment.speech ? console.log("A-chan: ", e.result.fulfillment.speech) : console.log("ERROR: Speech response is unavailable");
			}
			else if (e.result === 'domains') {
				// Result from Domains may need a different set functionalities
				if (e.result.metadata.html) {
					console.log("A-chan: ", e.result.metadata.html)
				}
				else {
					console.log("! Speech or html response is unavailable !")
				}
			}
			else {
				console.log('Response failed');
			}

			res.json({response: e});
		});

		pizzaRequest.on('error', function (e) {
			console.log(e);
		});

		pizzaRequest.end();
	})
}



