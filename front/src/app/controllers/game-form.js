/* global angular */

angular.module('tg').controller('GameFormCtrl', ['$scope', 'GameService',
  function($scope, GameService) {
    $scope.createGame = function (game) {
      GameService.save(game);
    };
  }
]);
