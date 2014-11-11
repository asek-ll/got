/* global angular */
angular.module('tg', [
  //'templates-main',
  'ngRoute',
  'btford.socket-io',
  'ngResource'
]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider.when('/games', {
      templateUrl: 'views/game-list.tpl.html',
      controller: 'GameCtrl'
    }).when('/games/new', {
      templateUrl: 'views/game-form.tpl.html',
      controller: 'GameFormCtrl'
    }).when('/', {
      templateUrl: 'views/home.tpl.html',
      controller: 'MainCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);
