angular.module('tg').controller 'GameFormCtrl', ($scope, GameService) ->

    $scope.createGame = (game) ->
          GameService.save game
