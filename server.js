var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './public')));

//must be before routes.js!!
app.use(bodyParser.json());

// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app);

app.get('/', function (req, res) {
	res.render('index');
})

// ============================
// API AI
// ============================

var apiai = require('apiai');
var apiaiBUrl = "https://api.api.ai/v1/";

var agentZero = apiai("2231bea759c4431bbb20931b23d72af4", "ee49bf5b-f7e5-4f5e-938d-3330fc31e7a7");
var pizzaOrderAgent = apiai("07f265e6e3cf4d27acb0cb60374da632","ee49bf5b-f7e5-4f5e-938d-3330fc31e7a7");

// ============================
// / API AI
// ============================

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
	console.log("You have reached the pizza hotline with the request:");
	console.log(req.body);

	var pizzaRequest = pizzaOrderAgent.textRequest(req.body.userQuery);

	pizzaRequest.on('response', function (e) {
		console.log('Order taker has responded:');
		console.log(e);

		res.json({response: e});
	});

	pizzaRequest.on('error', function (e) {
		console.log(e);
	});

	pizzaRequest.end();
})

var server = app.listen(1232, function () {
	console.log('Established connection to 1232.');
})