angular.module('tg').controller('MainCtrl', ['$scope', 'SocketService',
  function($scope, SocketService) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    SocketService.forward('scope', $scope);
    SocketService.on('hey', function() {
      console.log(arguments);
    });

    $scope.$on('socket', function(ev, data) {
      console.log(ev, data);
    });
  }
]);
