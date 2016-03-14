'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: './components/home/home.html',
    controller: 'homeController'
  });
}])

.factory('homeFactory', function ($http, $location) {
	return {
		factTest: "home factory is operational",

		sendUserQuery: function (info, callback) {
			console.log("in homeFactory.sendUserQuery. About to send the following:");
			console.log(info);
			$http.post('/ama', info).then(function (e) {
				console.log("response received from server");
				console.log(e);
				callback(e);
			})
		},
	}
})

.controller('homeController', function ($scope, $location, homeFactory) {
	$scope.testMsg = function () {
		console.log("button clicked");
		console.log(homeFactory.factTest);
	}

	$scope.aiResponses = {};

	$scope.sendUserQuery = function () {
		console.log("submit button clicked. user input contained:");
		console.log($scope.askTheAi);
		homeFactory.sendUserQuery($scope.askTheAi, function (e) {
			console.log("in controller. Received:");
			console.log(e);
			$scope.aiResponses.message = e.data.result.html;
			e.data.result.speech ? $scope.aiResponses.speech = e.data.result.speech : $scope.aiResponses.result = e.data.result
		});

		$scope.askTheAi = {};
	}

})