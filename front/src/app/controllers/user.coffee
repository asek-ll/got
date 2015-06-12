angular.module('tg').controller 'UserCtrl', ($scope, AuthService) ->
  $scope.$watch AuthService.isLoggedIn, (isLoggedIn) ->
    $scope.currentUser = AuthService.currentUser()
