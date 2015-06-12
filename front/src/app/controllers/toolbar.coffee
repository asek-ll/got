angular.module('tg').controller 'ToolbarCtrl', ($scope, AuthService, $location) ->
  $scope.$watch AuthService.isLoggedIn, (isLoggedIn) ->
    $scope.isLoggedIn = isLoggedIn
    $scope.currentUser = AuthService.currentUser()

  $scope.isActive = (viewLocation) ->
    viewLocation == $location.path()
