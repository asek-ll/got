/* global angular */

angular.module('tg').controller('ToolbarCtrl', ['$scope', 'AuthService',
  function($scope, AuthService) {

    $scope.$watch(AuthService.isLoggedIn, function(isLoggedIn) {
      $scope.isLoggedIn = isLoggedIn;
      $scope.currentUser = AuthService.currentUser();
    });

  }
]);
