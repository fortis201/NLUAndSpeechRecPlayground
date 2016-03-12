'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute', 
  'myApp.home',
  'myApp.dash'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('#/dash', {redirectTo: '/dash'})
  .otherwise({redirectTo: '/home'})
}]);

console.log("end of app.js");

// module.exports = (function () {
// 	return myApp;
// })();