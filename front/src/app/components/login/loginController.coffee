angular.module('tg').controller 'LoginCtrl', ($scope, AuthService, $location) ->
  $scope.login = (user) ->
    AuthService.login(user).then ->
      $scope.error = false
      $location.path '/'
    , ->
      $scope.error = true
