/* global angular */

angular.module('tg').controller('GameCtrl', ['$scope', 'GameService',
  function($scope, GameService) {
    GameService.query(function (data) {
    });
  }
]);
