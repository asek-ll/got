/* global angular */

angular.module('tg').controller('ToolbarCtrl', ['$scope', 'AuthService', '$location',
  function($scope, AuthService, $location) {

    $scope.$watch(AuthService.isLoggedIn, function(isLoggedIn) {
      $scope.isLoggedIn = isLoggedIn;
      $scope.currentUser = AuthService.currentUser();
    });

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
    
  }
]);
