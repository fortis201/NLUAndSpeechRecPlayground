'use strict';
console.log("app.js has loaded");

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute', 
  'myApp.home',
  'myApp.dash',
  'myApp.fbGraph'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('#/dash', {redirectTo: '/dash'})
  .otherwise({redirectTo: '/home'})
}])