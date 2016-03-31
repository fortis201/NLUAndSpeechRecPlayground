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
		factTest: "# # # # # # # # # #",

		sendUserQuery: function (info, callback) {
			console.log("in homeFactory.sendUserQuery. About to send the following:");
			console.log(info);
			$http.post('/ama', info).then(function (e) {
				console.log("response received from server");
				console.log(e);
				callback(e);
			})
		},

		getRefreshCounter: function (callback) {
			console.log("# # # Attempting to call /getRefreshCounter # # #");
			$http.get('/getRefreshCounter').then(function (e) {
				console.log("checked... response: ", e);
				callback(e);
			})
		},
	}
})

// #################################### //
// Custom directive for enter key press
// #################################### //
.directive('enterPressed', function() {
	return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterPressed);
                });
                event.preventDefault();
            }
        });
    };
})
// #################################### //
// End directive
// #################################### //

.controller('homeController', function ($scope, $location, homeFactory) {

	$scope.testMsg = function () {
		console.log(homeFactory.factTest());
	}

	// TODO: 
	// create a page refresh counter on home load --> this will be converted into an api call counter later.
	// save the call count in the database.
	// call count should reset to 0 depending on api call limit refresh times. (eg. google maps has 2,500 api call limits per day.)
	// hook it up to the google maps api to start tracking api call count per day.
	$scope.getRefreshCounter = homeFactory.getRefreshCounter(function (e) {
		console.log("in controller... assgning response to scope");
		$scope.apiCaller = e;
		console.log($scope.apiCaller);
	});

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


	// ####################### //
	// JS Speech Synthesis //
	// ####################### //

	speechSynthesis ? console.log("SS is available!") : console.log("ERR: SS unavailable!");
	console.log("Voices unchanged... Waiting for onvoiceschanged");


	$scope.tts = new SpeechSynthesisUtterance();
	$scope.vList; // initialize the voices list object as undefined
	$scope.vChanged = false;


	speechSynthesis.onvoiceschanged = function() {
		$scope.$apply(function () {
			$scope.vList = window.speechSynthesis.getVoices();
			$scope.vChanged = true;
		})

		// It's weird how this runs three times. 
		// The voices should have changed just once right?
		// 											- me
		console.log("Speech Synth - All Voices List: ", $scope.vList);
		event.preventDefault();
	}

	setTimeout(function() {
		if ($scope.vChanged) {
			$scope.tts.voice = $scope.vList.filter(function(voice) { 
				return voice.name == 'Fiona'; 
			})[0];
			$scope.tts.lang = 'en-AU';
			$scope.tts.rate = 1;
			$scope.tts.text = "The quick brown fox jumped over the lazy dog near the river bank. It's a cold day to take a dip! Cheers, cheats, cheeze!"
			$scope.tts.onend = function(event) { 
				console.log(' & & & Speech Synthesis Finished in ' + event.elapsedTime + ' seconds. & & &');
				console.log('Event object: ', event); 
			}
			speechSynthesis.speak($scope.tts)
		}
	}, 500);

	$scope.theVoice = {} // Will contain voice name from input
	$scope.theVoice.obj;
	$scope.getVoiceObj = function (e) {
		console.log('Button pressed with the value: ', e);
		$scope.vList.filter(function(voice) { 
			if (voice.name === e) {
				$scope.theVoice.obj = voice;
				console.log("Voice match found for: ", voice.name);
				console.log("Scoped object: ", $scope.theVoice.obj)

				$scope.tts.lang = voice.lang;
				$scope.tts.voice = voice.name;
				console.log("~ ~ ~ Lang and Name were changed: ~ ~ ~", $scope.tts.lang, " &&  ", $scope.tts.voice)
				console.log("tts looks like: ", $scope.tts);
				speechSynthesis.speak($scope.tts);

				event.preventDefault();
			}
		})[0];
	}

})