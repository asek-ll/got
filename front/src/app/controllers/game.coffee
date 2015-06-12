angular.module('tg').controller 'GameCtrl', ($scope, GameService) ->
  GameService.query (data) ->
    $scope.games = data
