angular.module('tg').controller 'MainCtrl', ($scope, SocketService) ->

  $scope.awesomeThings = [
    'HTML5 Boilerplate'
    'AngularJS'
    'Karma'
  ]

  SocketService.forward 'scope', $scope

  SocketService.on 'hey', ->
    console.log arguments

  $scope.$on 'socket', (ev, data) ->
    console.log ev, data
