/* global angular */
angular.module('tg', [
  'templates-main',
  'ngRoute',
  'btford.socket-io',
  'ngResource'
]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider.when('/games', {
      templateUrl: 'partials/game-list.tpl.html',
      controller: 'GameCtrl'
    }).when('/', {
      templateUrl: 'partials/home.tpl.html',
      controller: 'MainCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);
