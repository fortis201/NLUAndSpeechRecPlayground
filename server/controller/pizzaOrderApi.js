// ************************************
// Must be formatted similar to apiCallers.js
// ************************************

console.log("Ready to take pizza orders!");

var pizzapi = require('pizzapi');

module.exports = (function (app) {
	return {
		findNearby: function (req, res, reqBody) {
			pizzapi.Util.findNearbyStores(
			    '94080',
			    'Delivery',
			    function(storeData){
			    	console.log('Store data received: ');
			        console.log(storeData);
			    }
			);
		},		
	}
})();
