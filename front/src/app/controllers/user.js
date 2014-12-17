/* global angular */

angular.module('tg').controller('UserCtrl', ['$scope', 'AuthService',
  function($scope, AuthService) {
    $scope.$watch(AuthService.isLoggedIn, function(isLoggedIn) {
      $scope.currentUser = AuthService.currentUser();
    });
  }
]);
