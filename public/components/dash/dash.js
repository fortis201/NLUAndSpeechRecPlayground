'use strict';

angular.module('myApp.dash', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dash', {
    templateUrl: './components/dash/dash.html',
    controller: 'dashController'
  });
}])

.factory('dashFactory', function ($http, $location) {
	return {
		factTest: "dash factory is operational",

		sendUserQuery: function (info, callback) {
			$http.post('/orderPizza', info).then(function (e) {
				console.log('pizza factory received a server response:');
				console.log(e);
				callback(e);
			})
		},
	}
})

.controller('dashController', function ($scope, $location, dashFactory) {

	$scope.orderPizza;
	$scope.aiResponse = {};
	$scope.aiResponse.msg = "Say a greeting to begin your order.";
	$scope.pizzaParams;

	$scope.pushQueryToFactory = function (p) {
		dashFactory.sendUserQuery(p, function (e) {
			console.log("PizzaController received the following form the factory:");
			console.log(e);

			if (e.data.response.id) {
				$scope.resId = e.data.response.id;
			}

			if (e.data.response.result.fulfillment.speech.length > 0) {
				$scope.aiResponse.msg = e.data.response.result.fulfillment.speech;
				console.log("resId is: ");
				console.log($scope.resId);
			}
			$scope.pizzaParams = e.data.response.result.parameters;
		})
	}

	if (annyang) {
		console.log("Annyang! is ready");

		var commands = {
			'*val': function (val) {
				console.log("Annyang recognized the following string:");
				console.log(val);
			}
		}
		annyang.addCommands(commands);
		annyang.start();
	}

	$scope.sendVoiceQuery = function (e) {
		console.log("Speech input received: ");
		console.log(e);

		$scope.pushQueryToFactory(e);
	}

	$scope.sendUserQuery = function () {
		console.log("Getting ready to send your request...");
		console.log($scope.orderPizza);
		// dashFactory.sendUserQuery($scope.orderPizza, function (e) {
		// 	console.log("pizza controller received the following:");
		// 	console.log(e);

		// 	if (e.data.response.id) {
		// 		$scope.resId = e.data.response.id;
		// 	}

		// 	if (e.data.response.result.fulfillment.speech.length > 0) {
		// 		$scope.aiResponse.msg = e.data.response.result.fulfillment.speech;
		// 		console.log("resId is: ");
		// 		console.log($scope.resId);
		// 	}
		// 	$scope.pizzaParams = e.data.response.result.parameters;
		// })			
	
		$scope.pushQueryToFactory($scope.orderPizza);

		$scope.orderPizza = {};
	}
})